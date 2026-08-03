"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { cloneElement, isValidElement, useActionState, useId, useState } from "react";
import type { ReactElement, ReactNode } from "react";

import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { Button } from "@/components/ui";
import type { Business } from "@/lib/schema";
import { businessHoursFor, cn, generateTimeSlots, isRowUnavailable, whatsappHref } from "@/lib/utils";

/**
 * One form serves both the contact section and the booking section, plus the
 * `steps` booking wizard (BookingSteps.tsx) reuses its field pieces directly.
 *
 * A booking is an enquiry with a date, a time and a service dropdown — not a
 * different component. Everything variable comes in as props from config.
 */

type Props = {
  submitLabel: string;
  /** Populates a <select>; omitted entirely when empty. */
  options?: string[];
  optionsLabel?: string;
  askPreferredTime?: boolean;
  /** Drives the time-slot <select>; omitted entirely (falls back to a plain time input) if empty. */
  businessHours?: Business["businessHours"];
  slotLengthMinutes?: number;
  /** Shows a "Confirm on WhatsApp" link after a successful submit. */
  whatsappNumber?: string;
  businessName?: string;
  /** Picks which section's successMessage the server action replies with. */
  formType?: "contact" | "booking";
  className?: string;
};

// A "use server" file may only export async functions, so this plain object
// lives here instead of alongside submitEnquiry in app/actions.ts.
export const initialEnquiryState: EnquiryState = { status: "idle" };

export function EnquiryForm({
  submitLabel,
  options = [],
  optionsLabel = "What can we help with?",
  askPreferredTime = false,
  businessHours = [],
  slotLengthMinutes = 60,
  whatsappNumber,
  businessName,
  formType = "contact",
  className,
}: Props) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const id = useId();

  if (state.status === "success") {
    return <SuccessPanel state={state} whatsappNumber={whatsappNumber} businessName={businessName} />;
  }

  const errorFor = (name: string) => state.fieldErrors?.[name];

  return (
    <form action={formAction} className={cn("flex flex-col gap-4", className)} noValidate>
      <Honeypot id={id} />
      <FormType value={formType} />

      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-brand bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      <ContactFields id={id} errorFor={errorFor} values={state.values} />

      <OptionsField
        id={id}
        options={options}
        label={optionsLabel}
        error={errorFor("subject")}
        value={state.values?.subject}
      />

      {askPreferredTime ? (
        <DateTimeFields
          id={id}
          businessHours={businessHours}
          slotLengthMinutes={slotLengthMinutes}
          values={state.values}
        />
      ) : null}

      <MessageField id={id} error={errorFor("message")} value={state.values?.message} />

      <SubmitButton pending={pending} submitLabel={submitLabel} className="mt-2 self-start" />
    </form>
  );
}

/**
 * Hidden from sighted users by position (not display:none, which some bots
 * detect) and from assistive tech by aria-hidden + tabIndex.
 */
export function Honeypot({ id }: { id: string }) {
  return (
    <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor={`${id}-company`}>Company (leave blank)</label>
      <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/**
 * Tells the server action which section it is answering, so the booking
 * section's own successMessage is used instead of the contact section's.
 */
export function FormType({ value }: { value: "contact" | "booking" }) {
  return <input type="hidden" name="formType" value={value} />;
}

export function SubmitButton({
  pending,
  submitLabel,
  className,
}: {
  pending: boolean;
  submitLabel: string;
  className?: string;
}) {
  return (
    <button type="submit" disabled={pending} className={cn("btn btn-primary", className)}>
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        submitLabel
      )}
    </button>
  );
}

/**
 * Service/job-type dropdown. Renders nothing when `options` is empty.
 *
 * Controlled, not `defaultValue`: React applies a select's `defaultValue` only
 * at mount — its update path skips `updateOptions` unless `multiple` changed —
 * so after React resets the form on submit, an uncontrolled select snaps back
 * to the placeholder and no re-render can put it back. A controlled value is
 * restored by React's own post-reset `restoreStateOfTarget`.
 */
export function OptionsField({
  id,
  options,
  label,
  required = false,
  error,
  value,
}: {
  id: string;
  options: string[];
  label: string;
  required?: boolean;
  error?: string;
  /** Seeds the initial selection, e.g. echoed back after a failed submit. */
  value?: string;
}) {
  const [selected, setSelected] = useState(value ?? "");

  if (options.length === 0) return null;

  return (
    <Field id={`${id}-subject`} label={label} error={error}>
      <select
        id={`${id}-subject`}
        name="subject"
        required={required}
        className="field"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="" disabled>
          Please choose…
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

/** Name + email/phone row — always contiguous in every layout that uses this form. */
export function ContactFields({
  id,
  errorFor,
  values,
}: {
  id: string;
  errorFor: (name: string) => string | undefined;
  /** Previously submitted values, restored after a failed submit. */
  values?: EnquiryState["values"];
}) {
  return (
    <>
      <Field id={`${id}-name`} label="Your name" error={errorFor("name")}>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={values?.name}
          className="field"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-email`} label="Email" error={errorFor("email")}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={values?.email}
            className="field"
          />
        </Field>

        <Field id={`${id}-phone`} label="Phone" optional error={errorFor("phone")}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values?.phone}
            className="field"
          />
        </Field>
      </div>
    </>
  );
}

/** The optional free-text message, shared by the flat form and the wizard's last step. */
export function MessageField({
  id,
  error,
  value,
}: {
  id: string;
  error?: string;
  value?: string;
}) {
  return (
    <Field id={`${id}-message`} label="Message" optional error={error}>
      <textarea
        id={`${id}-message`}
        name="message"
        rows={5}
        defaultValue={value}
        className="field"
      />
    </Field>
  );
}

/**
 * Date input + a time <select> generated from the matching businessHours row.
 *
 * `businessHours` empty (a config that hasn't filled hours in yet) falls back
 * to a plain time input — no slot logic, no dead end for that config.
 */
export function DateTimeFields({
  id,
  businessHours,
  slotLengthMinutes,
  values,
}: {
  id: string;
  businessHours: Business["businessHours"];
  slotLengthMinutes: number;
  /** Previously submitted values, restored after a failed submit. */
  values?: EnquiryState["values"];
}) {
  const [date, setDate] = useState(values?.preferredDate ?? "");
  const [time, setTime] = useState(values?.preferredTime ?? "");

  if (businessHours.length === 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-date`} label="Preferred date" optional>
          <input
            id={`${id}-date`}
            name="preferredDate"
            type="date"
            min={tomorrow()}
            defaultValue={values?.preferredDate}
            className="field"
          />
        </Field>
        <Field id={`${id}-time`} label="Preferred time" optional>
          <input
            id={`${id}-time`}
            name="preferredTime"
            type="time"
            defaultValue={values?.preferredTime}
            className="field"
          />
        </Field>
      </div>
    );
  }

  const row = date ? businessHoursFor(businessHours, parseLocalDate(date)) : undefined;
  // The opens/closes checks are what isRowUnavailable already covers; repeating
  // them here is what lets TypeScript narrow them to strings without an
  // assertion, so a row with missing hours can never reach generateTimeSlots.
  const open =
    row && !isRowUnavailable(row) && row.opens && row.closes
      ? { opens: row.opens, closes: row.closes }
      : undefined;
  const closed = date !== "" && !open;
  const slots = open ? generateTimeSlots(open.opens, open.closes, slotLengthMinutes) : [];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field id={`${id}-date`} label="Preferred date" optional>
        <input
          id={`${id}-date`}
          name="preferredDate"
          type="date"
          min={tomorrow()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="field"
        />
      </Field>
      <Field id={`${id}-time`} label="Preferred time" optional>
        <select
          id={`${id}-time`}
          name="preferredTime"
          disabled={date === "" || closed}
          // Controlled for the same reason as OptionsField. Falls back to the
          // placeholder when the chosen date's day doesn't offer this slot.
          value={slots.includes(time) ? time : ""}
          onChange={(e) => setTime(e.target.value)}
          className="field disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>
            {date === "" ? "Choose a date first" : closed ? "No slots that day" : "Please choose…"}
          </option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </Field>
      {closed ? (
        <p className="sm:col-span-2 text-sm text-muted">
          {row
            ? "We're closed that day — we'll confirm an alternative time."
            : "Tell us a preferred time and we'll confirm it."}
        </p>
      ) : null}
    </div>
  );
}

export function SuccessPanel({
  state,
  whatsappNumber,
  businessName,
}: {
  state: EnquiryState;
  whatsappNumber?: string;
  businessName?: string;
}) {
  const whatsappLink =
    whatsappNumber && state.submitted
      ? whatsappHref(whatsappNumber, summarize(state.submitted, businessName))
      : null;

  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-brand border border-line bg-surface p-10 text-center"
    >
      <CheckCircle2 className="text-primary" size={40} aria-hidden="true" />
      <p className="text-lg font-semibold">{state.message}</p>
      {whatsappLink ? (
        <Button href={whatsappLink} tone="secondary">
          Confirm on WhatsApp
        </Button>
      ) : null}
    </div>
  );
}

function summarize(
  submitted: NonNullable<EnquiryState["submitted"]>,
  businessName?: string,
): string {
  const parts = [submitted.subject, submitted.preferredDate, submitted.preferredTime].filter(Boolean);
  const details = parts.length > 0 ? ` — ${parts.join(", ")}` : "";
  return `Hi ${businessName ?? "there"}, confirming my booking${details}. — ${submitted.name}`;
}

/** Tomorrow's date as "YYYY-MM-DD", computed from local getters (not toISOString/UTC). */
function tomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Parses "YYYY-MM-DD" into a local-time Date — `new Date(isoString)` reads it as UTC and can shift the weekday. */
function parseLocalDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Visible label, error text next to its own field, and the aria wiring that
 * connects them — the three things placeholder-only forms get wrong.
 *
 * The aria-invalid/aria-describedby pair is applied here by cloning the input
 * rather than at each call site, so a new field physically cannot ship without it.
 */
export function Field({
  id,
  label,
  error,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-error` : undefined,
      })
    : children;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional ? <span className="ml-1 font-normal text-muted">(optional)</span> : null}
      </label>
      {control}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
