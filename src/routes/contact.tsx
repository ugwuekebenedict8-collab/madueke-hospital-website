import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/forms";
import { PageHero, PlaceholderNote, Section, SectionHeading } from "@/components/site/primitives";
import { DEPARTMENTS, HOSPITAL } from "@/data/site";
import { pageMeta } from "@/lib/seo";

const MAP_URL =
  "https://www.google.com/maps/place/Madueke+Memorial+Hospital+And+Maternity,+No+13+SunnyDan+Street,+Local,+Government+Area,+Onitsha+434107,+Anambra/@6.1236562,6.9477532,17z/data=!4m6!3m5!1s0x10439180e67aa34b:0x2f93888659eb18c8!8m2!3d6.1236562!4d6.9477532!16s%2Fg%2F11mv13_rrd?utm_campaign=ml-p&g_ep=Eg1tbF8yMDI2MDkyMl8wIOC7DCoASAJQAg%3D%3D";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Contact Us",
      "Contact Madueke Memorial Hospital and Maternity, find opening hours and send an enquiry.",
    ),
  component: Contact,
});
function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We’re Here to Help"
        description="Contact our team for appointments, general enquiries or help finding the right department."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading title="Contact Information" align="left" />
            <div className="mt-6 space-y-4">
              <Info icon={MapPin} title="Address" text={HOSPITAL.address} />
              <Info icon={Phone} title="Main phone" text={HOSPITAL.phone} />
              <Info icon={Mail} title="Email" text={HOSPITAL.email} />
              <Info icon={Phone} title="Emergency" text={HOSPITAL.emergencyPhone} />
            </div>
            <h2 className="mt-8 text-xl">Opening Hours</h2>
            <dl className="mt-4 space-y-3">
              {HOSPITAL.hours.map((x) => (
                <div
                  key={x.label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-border pb-3 text-sm"
                >
                  <dt className="font-medium">{x.label}</dt>
                  <dd className="text-right text-muted-foreground">{x.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
            <h2 className="text-2xl">Send an Enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please do not include sensitive medical information in this form.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <div className="grid gap-8 lg:grid-cols-2">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-border bg-secondary p-6 text-center transition-colors hover:border-primary"
            aria-label="Open Madueke Memorial Hospital in Google Maps"
          >
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 text-sm font-medium">Open in Google Maps</p>
              <p className="mt-1 text-xs text-muted-foreground">
                No. 13 SunnyDan Street, Onitsha, Anambra State
              </p>
            </div>
          </a>
          <div>
            <SectionHeading title="Department Contacts" align="left" />
            <div className="mt-5 max-h-80 overflow-y-auto rounded-2xl border border-border bg-background p-2">
              {DEPARTMENTS.map((d) => (
                <div
                  key={d.slug}
                  className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-0"
                >
                  <span className="text-sm font-medium">{d.name}</span>
                  <span className="text-xs text-muted-foreground">{d.contact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <PlaceholderNote>
          Address, phone, email, hours and map details should be kept current for patients.
        </PlaceholderNote>
      </Section>
    </>
  );
}
function Info({ icon: Icon, title, text }: { icon: typeof Phone; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-surface p-4">
      <Icon className="h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
