import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import {
  ArticleCard,
  FeatureCard,
  ServiceCard,
  StatCard,
  TeamMemberCard,
  TestimonialCard,
} from "@/components/site/cards";
import {
  Eyebrow,
  IconBadge,
  InteractiveImage,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import {
  ARTICLES,
  HOSPITAL,
  QUICK_CARDS,
  SERVICES,
  STATS,
  TEAM,
  TESTIMONIALS,
  TRUST_POINTS,
  WHY_US,
} from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${HOSPITAL.name} — Compassionate Care. Better Health.` },
      {
        name: "description",
        content:
          "Trusted healthcare delivered by experienced professionals in a modern, comfortable environment. Book an appointment or explore our services.",
      },
      { property: "og:title", content: `${HOSPITAL.name} — Compassionate Care. Better Health.` },
      {
        property: "og:description",
        content: "Trusted healthcare delivered by experienced professionals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <Eyebrow>Welcome to {HOSPITAL.name}</Eyebrow>
            <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
              Compassionate Care. Better Health.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Trusted healthcare delivered by experienced professionals in a modern, comfortable
              environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/appointments">Book an Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-secondary text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-in">
            <InteractiveImage
              src="/first.png"
              alt="Madueke Memorial Hospital and Maternity exterior"
              width={1086}
              height={1440}
              className="aspect-[4/5] rounded-3xl border border-border shadow-lift"
              imageClassName="object-[center_58%]"
            />
          </div>
        </div>
      </section>

      {/* Quick access cards */}
      <Section className="pt-14 sm:pt-16 lg:pt-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_CARDS.map((card) => (
            <Link key={card.title} to={card.to} className="group block rounded-2xl">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/30 group-hover:shadow-lift">
                <IconBadge icon={card.icon} />
                <h3 className="mt-5 text-base font-medium">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </article>
            </Link>
          ))}
        </div>
      </Section>

      {/* About preview */}
      <Section tone="soft">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <img
              src="/office.png"
              alt="A welcoming hospital office and consultation space"
              width={1440}
              height={1080}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </div>
          <div>
            <Eyebrow>About our hospital</Eyebrow>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl">Healthcare built around you.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We bring together experienced clinicians, modern facilities and a calm environment so
              that care feels straightforward at every step — from your first phone call to your
              follow-up visit.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                {
                  title: "Our mission",
                  text: "To provide accessible, high-quality healthcare with compassion and respect.",
                },
                {
                  title: "Patient-first approach",
                  text: "Decisions are explained clearly, and your questions are always welcome.",
                },
                {
                  title: "Modern environment",
                  text: "Comfortable spaces supported by modern medical equipment and processes.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{item.title}</span>
                    <span className="block text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 rounded-full">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="Our services"
          title="Healthcare Services for Every Stage of Life"
          description="Explore our range of medical services delivered by experienced healthcare professionals."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </Section>

      {/* Why choose us */}
      <Section tone="blue">
        <SectionHeading
          eyebrow="Why us"
          title="Why Patients Choose Us"
          description="A calm, well-organised experience supported by people who take the time to listen."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} note={stat.note} />
          ))}
        </div>
      </Section>

      {/* Doctors */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Our team"
          title="Meet Our Care Team"
          description="Get to know the people caring for patients and supporting the hospital."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.slice(0, 4).map((member) => (
            <TeamMemberCard key={member.slug} member={member} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/doctors">Meet the Full Team</Link>
          </Button>
        </div>
      </Section>

      <CtaBand />

      {/* Testimonials */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Patient voices"
          title="What Our Patients Say"
          description="Sample testimonials for layout purposes. Replace them with verified patient feedback."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section>
        <SectionHeading
          eyebrow="Health library"
          title="Health & Wellness Resources"
          description="General health information written in plain language. Not a substitute for professional medical advice."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.slice(0, 4).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/resources">View All Resources</Link>
          </Button>
        </div>
      </Section>

      {/* Emergency */}
      <Section tone="blue" className="pb-20">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Emergency</Eyebrow>
            <h2 className="mt-3 text-2xl sm:text-3xl">Need Emergency Care?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our emergency department is available 24/7 for urgent medical needs. Patients are
              assessed on arrival and seen in order of clinical urgency.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full">
              <Link to="/emergency">Get Emergency Help</Link>
            </Button>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Emergency line
              </dt>
              <dd className="mt-2 text-sm font-medium">{HOSPITAL.emergencyPhone}</dd>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Location
              </dt>
              <dd className="mt-2 text-sm font-medium">{HOSPITAL.address}</dd>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wider text-primary">
                Emergency department
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Open 24 hours, every day, with on-site triage, treatment rooms and observation
                areas. Contact details shown here are placeholders.
              </dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  );
}
