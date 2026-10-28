import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Errors = Record<string, string>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  hint?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only">(required)</span> : null}
      </Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = "min-h-11 rounded-xl";
const selectClass =
  "min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground";

function SuccessPanel({
  title,
  children,
  onReset,
}: {
  title: string;
  children: ReactNode;
  onReset: () => void;
}) {
  return (
    <div
      className="rounded-2xl border border-border bg-surface p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
      <Button variant="outline" className="mt-6 rounded-full" onClick={onReset}>
        Submit another request
      </Button>
    </div>
  );
}

function useDemoSubmit() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const submit = async () => {
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState("success");
  };
  return { state, submit, reset: () => setState("idle") };
}

export function AppointmentForm() {
  const [errors, setErrors] = useState<Errors>({});
  const { state, submit, reset } = useDemoSubmit();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (get("fullName").length < 2) next["fullName"] = "Please enter your full name.";
    if (!get("dob")) next["dob"] = "Please enter your date of birth.";
    if (get("phone").length < 6) next["phone"] = "Please enter a valid phone number.";
    if (!emailRe.test(get("email"))) next["email"] = "Please enter a valid email address.";
    if (!get("date")) next["date"] = "Please choose a preferred date.";
    if (!get("time")) next["time"] = "Please choose a preferred time.";
    if (get("reason").length < 3) next["reason"] = "Please tell us the reason for your visit.";
    setErrors(next);
    if (Object.keys(next).length === 0) void submit();
  };

  if (state === "success") {
    return (
      <SuccessPanel
        title="Request received (demo only)"
        onReset={() => {
          reset();
          setErrors({});
        }}
      >
        <p>
          This is a front-end demonstration. No appointment has been booked and no information was
          sent or stored. Once a booking system is connected, requests submitted here will reach the
          appointments team.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={errors["fullName"]}>
          <Input
            id="fullName"
            name="fullName"
            className={inputClass}
            placeholder="e.g. Amara Okafor"
            autoComplete="name"
            aria-invalid={!!errors["fullName"]}
            aria-describedby={errors["fullName"] ? "fullName-error" : undefined}
          />
        </Field>
        <Field id="dob" label="Date of Birth" required error={errors["dob"]}>
          <Input id="dob" name="dob" type="date" className={inputClass} aria-invalid={!!errors["dob"]} />
        </Field>
        <Field id="phone" label="Phone Number" required error={errors["phone"]}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="Your contact number"
            autoComplete="tel"
            aria-invalid={!!errors["phone"]}
          />
        </Field>
        <Field id="email" label="Email" required error={errors["email"]}>
          <Input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors["email"]}
          />
        </Field>
        <Field id="date" label="Preferred Date" required error={errors["date"]}>
          <Input id="date" name="date" type="date" className={inputClass} aria-invalid={!!errors["date"]} />
        </Field>
        <Field id="time" label="Preferred Time" required error={errors["time"]}>
          <Input id="time" name="time" type="time" className={inputClass} aria-invalid={!!errors["time"]} />
        </Field>
      </div>

      <Field id="reason" label="Reason for Visit" required error={errors["reason"]}>
        <Input
          id="reason"
          name="reason"
          className={inputClass}
          placeholder="e.g. Routine check-up"
          aria-invalid={!!errors["reason"]}
        />
      </Field>

      <Field id="message" label="Additional Message">
        <Textarea
          id="message"
          name="message"
          rows={4}
          className="rounded-xl"
          placeholder="Anything else our team should know before your visit."
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="rounded-full" disabled={state === "loading"}>
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            "Request Appointment"
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Fields marked <span className="text-primary">*</span> are required.
        </p>
      </div>

      <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
        Need urgent medical attention?{" "}
        <Link to="/emergency" className="font-medium text-primary underline-offset-4 hover:underline">
          Contact our emergency department
        </Link>
        .
      </p>
    </form>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const { state, submit, reset } = useDemoSubmit();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (get("name").length < 2) next["name"] = "Please enter your name.";
    if (!emailRe.test(get("email"))) next["email"] = "Please enter a valid email address.";
    if (get("subject").length < 2) next["subject"] = "Please add a subject.";
    if (get("message").length < 10) next["message"] = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) void submit();
  };

  if (state === "success") {
    return (
      <SuccessPanel
        title="Message ready to send (demo only)"
        onReset={() => {
          reset();
          setErrors({});
        }}
      >
        <p>
          This form is a front-end demonstration. Your message has not been delivered or stored.
          Connect a backend to route enquiries to the hospital team.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors["name"]}>
          <Input id="name" name="name" className={inputClass} autoComplete="name" aria-invalid={!!errors["name"]} />
        </Field>
        <Field id="c-email" label="Email" required error={errors["email"]}>
          <Input id="c-email" name="email" type="email" className={inputClass} autoComplete="email" aria-invalid={!!errors["email"]} />
        </Field>
        <Field id="c-phone" label="Phone">
          <Input id="c-phone" name="phone" type="tel" className={inputClass} autoComplete="tel" />
        </Field>
        <Field id="subject" label="Subject" required error={errors["subject"]}>
          <Input id="subject" name="subject" className={inputClass} aria-invalid={!!errors["subject"]} />
        </Field>
      </div>
      <Field id="c-message" label="Message" required error={errors["message"]}>
        <Textarea id="c-message" name="message" rows={5} className="rounded-xl" aria-invalid={!!errors["message"]} />
      </Field>
      <Button type="submit" size="lg" className={cn("rounded-full sm:self-start")} disabled={state === "loading"}>
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

export function ApplicationForm({ positions }: { positions: string[] }) {
  const [errors, setErrors] = useState<Errors>({});
  const { state, submit, reset } = useDemoSubmit();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (get("name").length < 2) next["name"] = "Please enter your name.";
    if (!emailRe.test(get("email"))) next["email"] = "Please enter a valid email address.";
    if (get("phone").length < 6) next["phone"] = "Please enter a valid phone number.";
    if (!get("position")) next["position"] = "Please select a position.";
    setErrors(next);
    if (Object.keys(next).length === 0) void submit();
  };

  if (state === "success") {
    return (
      <SuccessPanel
        title="Application form completed (demo only)"
        onReset={() => {
          reset();
          setErrors({});
        }}
      >
        <p>
          No application has been submitted and no file was uploaded or stored. CV handling requires
          a connected backend with secure storage.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="a-name" label="Full Name" required error={errors["name"]}>
          <Input id="a-name" name="name" className={inputClass} autoComplete="name" aria-invalid={!!errors["name"]} />
        </Field>
        <Field id="a-email" label="Email" required error={errors["email"]}>
          <Input id="a-email" name="email" type="email" className={inputClass} autoComplete="email" aria-invalid={!!errors["email"]} />
        </Field>
        <Field id="a-phone" label="Phone" required error={errors["phone"]}>
          <Input id="a-phone" name="phone" type="tel" className={inputClass} autoComplete="tel" aria-invalid={!!errors["phone"]} />
        </Field>
        <Field id="a-position" label="Position" required error={errors["position"]}>
          <select id="a-position" name="position" className={selectClass} defaultValue="">
            <option value="" disabled>
              Select a position
            </option>
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="a-cv" label="CV Upload" hint="Placeholder only — files are not uploaded or stored.">
        <Input id="a-cv" name="cv" type="file" className="min-h-11 rounded-xl py-2.5" disabled />
      </Field>
      <Field id="a-message" label="Message">
        <Textarea id="a-message" name="message" rows={4} className="rounded-xl" />
      </Field>
      <Button type="submit" size="lg" className="rounded-full sm:self-start" disabled={state === "loading"}>
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
