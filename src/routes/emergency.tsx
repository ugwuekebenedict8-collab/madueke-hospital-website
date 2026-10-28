import { createFileRoute } from "@tanstack/react-router";
import { Activity, Ambulance, Clock, MapPin, Phone, Siren } from "lucide-react";
import { FeatureCard } from "@/components/site/cards";
import { PageHero, PlaceholderNote, Section, SectionHeading } from "@/components/site/primitives";
import { HOSPITAL } from "@/data/site";
import { pageMeta } from "@/lib/seo";
export const Route = createFileRoute("/emergency")({
  head: () =>
    pageMeta(
      "Emergency Care",
      "Find emergency department contact, location and urgent care information.",
    ),
  component: Emergency,
});
function Emergency() {
  return (
    <>
      <PageHero
        eyebrow="Open 24 hours"
        title="Emergency Care When You Need It."
        description="Our emergency department provides around-the-clock assessment and treatment for urgent medical needs."
      />
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/emer.png"
            alt="Modern hospital emergency department entrance"
            width={1408}
            height={912}
            loading="lazy"
            className="block h-auto w-full max-w-full rounded-3xl border border-border object-cover shadow-soft"
          />
          <div>
            <SectionHeading
              eyebrow="Emergency department"
              title="Ready when urgent care cannot wait"
              align="left"
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Our team assesses every patient on arrival. People with the most urgent clinical needs
              are seen first, which may mean some patients wait longer.
            </p>
            <div className="mt-6 space-y-3">
              <Info icon={Phone} label="Emergency contact" value={HOSPITAL.emergencyPhone} />
              <Info icon={MapPin} label="Location" value={HOSPITAL.address} />
              <Info icon={Ambulance} label="Ambulance" value={HOSPITAL.ambulance} />
            </div>
            <PlaceholderNote>For urgent medical needs, call the emergency number above.</PlaceholderNote>
          </div>
        </div>
      </Section>
      <Section tone="blue">
        <SectionHeading title="Available Emergency Services" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Siren,
              title: "Emergency Triage",
              text: "Prompt assessment based on clinical urgency.",
            },
            {
              icon: Activity,
              title: "Acute Care",
              text: "Assessment and treatment of sudden illness.",
            },
            {
              icon: Ambulance,
              title: "Trauma Support",
              text: "Initial care and stabilisation following injury.",
            },
            {
              icon: Clock,
              title: "24/7 Observation",
              text: "Monitoring and coordination of next steps.",
            },
          ].map((x) => (
            <FeatureCard key={x.title} {...x} />
          ))}
        </div>
      </Section>
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl">What to Do in an Emergency</h2>
          <ol className="mt-6 space-y-4">
            {[
              "Call the hospital's verified emergency line or local emergency services.",
              "Give your location, contact number and a clear description of what has happened.",
              "Follow the emergency responder's instructions and do not move an injured person unless told to do so.",
              "Bring identification and medication information if it is safe and practical.",
            ].map((x, i) => (
              <li key={x} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{x}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg">Important emergency disclaimer</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This website does not provide emergency diagnosis or advice. If someone may be
              seriously ill or injured, contact local emergency services immediately. Do not rely on
              this website for urgent assistance.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
function Info({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-surface p-4">
      <Icon className="h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
