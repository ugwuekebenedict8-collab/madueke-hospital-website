import { createFileRoute } from "@tanstack/react-router";
import { Cpu, FlaskConical, Heart, Scan, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureCard } from "@/components/site/cards";
import {
  InteractiveImage,
  PageHero,
  PlaceholderNote,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { LEADERSHIP, VALUES } from "@/data/site";
import { pageMeta } from "@/lib/seo";
export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About Us",
      "Learn about our mission, values, facilities and patient-first approach to modern hospital care.",
    ),
  component: About,
});
function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Compassionate Healthcare. Built on Trust."
        description="A modern hospital experience shaped around clinical quality, thoughtful spaces and respect for every patient."
      />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <InteractiveImage
            src="/bright.png"
            alt="Madueke Memorial Hospital staff standing together outside the hospital"
            width={1393}
            height={1280}
            className="aspect-[4/3] rounded-3xl border border-border shadow-soft"
          />
          <div>
            <SectionHeading eyebrow="Who we are" title="Care that feels personal" align="left" />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Madueke Memorial Hospital and Maternity is a private hospital supported by a team of
              25+ nurses, experienced professionals and thoughtful services. Our goal is to make
              every visit feel clear, calm and well supported.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-lg">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To provide safe, accessible and compassionate care for every patient.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-lg">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To be a trusted center for modern, human-centered healthcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <SectionHeading eyebrow="What guides us" title="Our Values" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <FeatureCard key={v.title} {...v} />
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Our facilities"
          title="Designed for comfort and care"
          description="Bright, modern environments with practical spaces for patients, families and clinical teams."
        />
        <InteractiveImage
          src="/clinic.png"
          alt="A clean, comfortable hospital patient room"
          width={1448}
          height={968}
          className="mt-10 aspect-16/9 rounded-3xl border border-border shadow-soft"
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Reception & waiting areas",
            "Patient rooms",
            "Consultation rooms",
            "Laboratory",
            "Imaging",
            "Operating facilities",
          ].map((x) => (
            <div
              key={x}
              className="rounded-2xl border border-border bg-card p-5 text-sm font-medium shadow-soft"
            >
              {x}
              <p className="mt-2 font-normal text-muted-foreground">
                A calm, well-equipped space designed around patient comfort and clinical care.
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="blue">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Medical technology"
              title="Modern tools, thoughtfully used"
              align="left"
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Our clinical teams use technology to support diagnosis, communication and continuity
              of care. Specific equipment and systems should be listed here only after hospital
              verification.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Scan, title: "Diagnostic imaging" },
              { icon: FlaskConical, title: "Laboratory systems" },
              { icon: Cpu, title: "Digital care workflows" },
              { icon: Heart, title: "Patient monitoring" },
            ].map((x) => (
              <FeatureCard
                key={x.title}
                icon={x.icon}
                title={x.title}
                text="Modern clinical systems support accurate assessment, coordinated care and clear communication."
              />
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="Our Leadership Team"
          description="Our leaders bring together hospital management, nursing leadership, service evaluation and finance."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((x) => (
            <article
              key={x.name}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft"
            >
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary text-xl font-semibold text-primary">
                {x.initials}
              </span>
              <h3 className="mt-5 text-lg">{x.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{x.role}</p>
            </article>
          ))}
        </div>
        <div className="mt-14">
          <SectionHeading
            eyebrow="Standards"
            title="Accreditations & Certifications"
            align="left"
          />
          <PlaceholderNote>
            Add verified accreditation and certification information here. No accreditation is
            claimed by this website.
          </PlaceholderNote>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center"
              >
                <ShieldCheck className="mx-auto h-7 w-7 text-primary" />
                <p className="mt-3 text-sm font-medium">[Accreditation Placeholder {n}]</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
