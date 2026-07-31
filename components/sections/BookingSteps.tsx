"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";

import {
  ContactFields,
  DateTimeFields,
  FormType,
  Honeypot,
  initialEnquiryState,
  MessageField,
  OptionsField,
  SubmitButton,
  SuccessPanel,
} from "@/components/EnquiryForm";
import { submitEnquiry } from "@/app/actions";
import type { Business } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * The `steps` booking variant: service, then date & time, then contact
 * details, one screen at a time. Split into its own client leaf so
 * Booking.tsx and the other two variants stay server components, same
 * precedent as ServicesTabs.tsx for the `tabs` services variant.
 *
 * Every step's fields stay mounted for the whole lifetime of the form —
 * only CSS (the native `hidden` attribute) hides the inactive ones — so a
 * value entered on step 1 is still present in FormData when the form
 * finally submits from the last step. Unmounting a step's fields would
 * silently drop them from the submission instead.
 */

type Step = "service" | "datetime" | "details";

const STEP_LABELS: Record<Step, string> = {
  service: "Service",
  datetime: "Date & time",
  details: "Details",
};

type Props = {
  submitLabel: string;
  options?: string[];
  optionsLabel?: string;
  askPreferredTime?: boolean;
  businessHours?: Business["businessHours"];
  slotLengthMinutes?: number;
  whatsappNumber?: string;
  businessName?: string;
};

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function BookingSteps({
  submitLabel,
  options = [],
  optionsLabel = "What can we help with?",
  askPreferredTime = false,
  businessHours = [],
  slotLengthMinutes = 60,
  whatsappNumber,
  businessName,
}: Props) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const id = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const formRef = useRef<HTMLFormElement>(null);
  /** Set when a submit is bounced to an earlier step; reported once that step is on screen. */
  const deferredReport = useRef<Control | null>(null);

  // reportValidity() does nothing on a `hidden` element, so it has to wait for
  // the commit that reveals the step. An effect keyed on stepIndex runs after
  // that commit; a requestAnimationFrame here would be racing it.
  useEffect(() => {
    const control = deferredReport.current;
    if (!control) return;
    deferredReport.current = null;
    control.reportValidity();
  }, [stepIndex]);

  const steps: Step[] = [
    ...(options.length > 0 ? (["service"] as const) : []),
    ...(askPreferredTime ? (["datetime"] as const) : []),
    "details",
  ];
  const isLastStep = stepIndex === steps.length - 1;

  if (state.status === "success") {
    return <SuccessPanel state={state} whatsappNumber={whatsappNumber} businessName={businessName} />;
  }

  const errorFor = (name: string) => state.fieldErrors?.[name];

  /** Reports native validity for the currently active step's fields, focusing the first invalid one. */
  function validateStep(index: number): boolean {
    const container = stepRefs.current[index];
    if (!container) return true;
    for (const control of container.querySelectorAll<Control>("input, select, textarea")) {
      if (!control.checkValidity()) {
        control.reportValidity();
        return false;
      }
    }
    return true;
  }

  /**
   * Final gate on the form's actual `submit` event — not just the submit
   * button's onClick. Per-step "Next" validation is only a progressive nicety;
   * this is what stops an incomplete booking reaching the server no matter how
   * the submit was triggered (a click, or the browser's own implicit
   * submit-on-Enter from inside a field, which never goes through any button's
   * onClick). preventDefault here cancels the action outright: React passes a
   * null action to startHostTransition when the event was default-prevented,
   * so neither the server call nor the form reset happens.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const invalid = formRef.current?.querySelector<Control>(":invalid");
    if (!invalid) return;
    e.preventDefault();

    const invalidStep = stepRefs.current.findIndex((el) => el?.contains(invalid));
    if (invalidStep !== -1 && invalidStep !== stepIndex) {
      deferredReport.current = invalid;
      setStepIndex(invalidStep);
    } else {
      invalid.reportValidity();
    }
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      noValidate
    >
      <Honeypot id={id} />
      <FormType value="booking" />

      <ol className="flex gap-2" aria-label="Booking steps">
        {steps.map((step, i) => (
          <li key={step} className="flex-1">
            <div
              aria-current={i === stepIndex ? "step" : undefined}
              className={cn(
                "rounded-brand border px-3 py-2 text-center text-xs font-semibold tracking-wide uppercase",
                i === stepIndex
                  ? "border-primary bg-primary text-on-primary"
                  : i < stepIndex
                    ? "border-primary text-primary"
                    : "border-line text-muted",
              )}
            >
              {i + 1}. {STEP_LABELS[step]}
            </div>
          </li>
        ))}
      </ol>

      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-brand bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      {steps.map((step, i) => (
        <div
          key={step}
          ref={(el) => {
            stepRefs.current[i] = el;
          }}
          hidden={i !== stepIndex}
          className="flex flex-col gap-4"
        >
          {step === "service" ? (
            <OptionsField
              id={id}
              options={options}
              label={optionsLabel}
              required
              error={errorFor("subject")}
              value={state.values?.subject}
            />
          ) : step === "datetime" ? (
            <DateTimeFields
              id={id}
              businessHours={businessHours}
              slotLengthMinutes={slotLengthMinutes}
              values={state.values}
            />
          ) : (
            <>
              <ContactFields id={id} errorFor={errorFor} values={state.values} />
              <MessageField id={id} error={errorFor("message")} value={state.values?.message} />
            </>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between gap-4">
        {stepIndex > 0 ? (
          <button type="button" onClick={() => setStepIndex((i) => i - 1)} className="btn btn-secondary">
            Back
          </button>
        ) : (
          <span />
        )}

        {isLastStep ? (
          <SubmitButton pending={pending} submitLabel={submitLabel} />
        ) : (
          <button
            type="button"
            onClick={() => {
              if (validateStep(stepIndex)) setStepIndex((i) => i + 1);
            }}
            className="btn btn-primary"
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
}
