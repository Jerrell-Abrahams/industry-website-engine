"use server";

import { z } from "zod";

import { getSiteConfig } from "@/lib/site";

/**
 * Contact / booking submission.
 *
 * Sends through Resend's REST API with `fetch`.
 * ponytail: no Resend SDK — this is one POST, and the SDK is a dependency to
 * maintain and audit for every client deployment. Swap it in if we start
 * needing attachments, batching or webhooks.
 *
 * With no RESEND_API_KEY set the submission is logged and reported as
 * successful, so `npm run dev` and preview builds work with no secrets.
 */

const EnquirySchema = z.object({
  // The `error` param covers the missing case too. `str()` below maps a blank
  // field to undefined, so without it an empty box reports Zod's raw
  // "expected string, received undefined" instead of this message.
  name: z.string({ error: "Please enter your name" }).trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address"),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().max(4000).optional(),
  preferredDate: z.string().trim().max(40).optional(),
  preferredTime: z.string().trim().max(40).optional(),
});

export type EnquiryFields =
  | "name"
  | "email"
  | "phone"
  | "subject"
  | "message"
  | "preferredDate"
  | "preferredTime";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Keyed by field name so the form can render errors beside their input. */
  fieldErrors?: Record<string, string>;
  /** Echoed back on real success only, so the UI can offer a WhatsApp confirmation. */
  submitted?: { name: string; subject?: string; preferredDate?: string; preferredTime?: string };
  /**
   * What the visitor typed, echoed back on every error return so the form can
   * repopulate itself. React resets a `<form action={...}>`'s uncontrolled
   * inputs on *every* submission (startHostTransition calls requestFormReset
   * before running the action), so without this a validation error hands the
   * visitor their own errors on top of blank fields.
   */
  values?: Partial<Record<EnquiryFields, string>>;
};

const str = (form: FormData, key: string): string | undefined => {
  const value = form.get(key);
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
};

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const config = getSiteConfig();
  // Which section's form this came from, so the booking section's own
  // successMessage is used rather than the contact section's.
  const formType = str(formData, "formType");

  // Honeypot: hidden from humans, irresistible to bots. Report success so the
  // bot doesn't learn it was caught and retry with the field left blank.
  if (str(formData, "company")) {
    return { status: "success", message: successMessage(config, formType) };
  }

  // Parsed and echoed back from the same object, so an error response always
  // carries exactly what the visitor typed.
  const values: Partial<Record<EnquiryFields, string>> = {
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    subject: str(formData, "subject"),
    message: str(formData, "message"),
    preferredDate: str(formData, "preferredDate"),
    preferredTime: str(formData, "preferredTime"),
  };

  const parsed = EnquirySchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const enquiry = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL ?? config.business.email;
  const apiKey = process.env.RESEND_API_KEY;
  const submitted = {
    name: enquiry.name,
    subject: enquiry.subject,
    preferredDate: enquiry.preferredDate,
    preferredTime: enquiry.preferredTime,
  };

  const lines = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    enquiry.phone && `Phone: ${enquiry.phone}`,
    enquiry.subject && `Subject: ${enquiry.subject}`,
    enquiry.preferredDate && `Preferred date: ${enquiry.preferredDate}`,
    enquiry.preferredTime && `Preferred time: ${enquiry.preferredTime}`,
  ].filter(Boolean);

  // The message is optional, and the blank separator has to be appended after
  // the filter above — filter(Boolean) would drop an empty string.
  if (enquiry.message) lines.push("", enquiry.message);

  if (!apiKey) {
    console.info(
      `[site-engine] No RESEND_API_KEY set — enquiry not sent. Would have emailed ${to}:\n${lines.join("\n")}`,
    );
    return { status: "success", message: successMessage(config, formType), submitted };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
        to: [to],
        // So the client can hit reply in their inbox and reach the customer.
        reply_to: enquiry.email,
        subject: `${config.business.name} — enquiry from ${enquiry.name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      // Log the provider's reason server-side; never surface it to the visitor.
      console.error(`[site-engine] Resend responded ${response.status}: ${await response.text()}`);
      return { status: "error", message: failureMessage(config), values };
    }

    return { status: "success", message: successMessage(config, formType), submitted };
  } catch (error) {
    console.error("[site-engine] Enquiry send failed:", error);
    return { status: "error", message: failureMessage(config), values };
  }
}

function successMessage(config: ReturnType<typeof getSiteConfig>, formType?: string): string {
  const section = formType === "booking" ? config.booking : config.contact;
  return section?.successMessage ?? "Thanks — we'll be in touch shortly.";
}

function failureMessage(config: ReturnType<typeof getSiteConfig>): string {
  return `Sorry, something went wrong sending your message. Please phone us on ${config.business.phone}.`;
}
