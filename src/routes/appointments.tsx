import { createFileRoute } from "@tanstack/react-router";
import { AppointmentForm } from "@/components/site/forms";
import { PageHero, PlaceholderNote, Section } from "@/components/site/primitives";
import { pageMeta } from "@/lib/seo";
export const Route=createFileRoute("/appointments")({head:()=>pageMeta("Book an Appointment","Request a hospital appointment using our simple, accessible appointment form."),component:()=> <><PageHero eyebrow="Appointments" title="Book an Appointment" description="Tell us what you need and your preferred time. Our appointments team will confirm availability."/><Section><div className="mx-auto max-w-4xl"><PlaceholderNote>This is a demo appointment flow. Submitting it does not create a real booking or send your information.</PlaceholderNote><div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10"><AppointmentForm/></div></div></Section></>});
