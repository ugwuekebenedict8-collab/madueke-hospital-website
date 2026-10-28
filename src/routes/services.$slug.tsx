import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Clock, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import {
  IconBadge,
  PageHero,
  PlaceholderNote,
  Section,
  SectionHeading,
} from "@/components/site/primitives";
import { DEPARTMENTS, SERVICES } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    const department = DEPARTMENTS.find((item) => item.name === service.department);
    return { service, department };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(loaderData.service.name, loaderData.service.short)
      : pageMeta("Service Not Found", "The requested medical service could not be found."),
  component: ServiceDetail,
  notFoundComponent: () => (
    <Section>
      <div className="text-center">
        <h1 className="text-3xl">Service not found</h1>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/services">View services and departments</Link>
        </Button>
      </div>
    </Section>
  ),
  errorComponent: ({ reset }) => (
    <Section>
      <div className="text-center">
        <h1 className="text-3xl">Service unavailable</h1>
        <Button className="mt-6 rounded-full" onClick={reset}>
          Try again
        </Button>
      </div>
    </Section>
  ),
});

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-muted-foreground">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-primary">
            <Check className="h-3 w-3" aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ServiceDetail() {
  const { service, department } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow={`Services & Departments · ${service.category}`}
        title={service.name}
        description={service.short}
        crumbs={[
          { label: "Services & Departments", to: "/services" },
          { label: service.name },
        ]}
      >
        <IconBadge icon={service.icon} />
      </PageHero>
      <Section>
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
          <div className="min-w-0">
            <PlaceholderNote>
              General service information. Clinical details should be reviewed by the hospital before
              publication.
            </PlaceholderNote>
            <div className="mt-8">
              <SectionHeading title="Service overview" align="left" />
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.overview}</p>
            </div>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="text-xl">Conditions we assess</h2>
                <div className="mt-5">
                  <DetailList items={service.conditions} />
                </div>
              </div>
              <div>
                <h2 className="text-xl">Services provided</h2>
                <div className="mt-5">
                  <DetailList items={service.treatments} />
                </div>
              </div>
            </div>
          </div>
          <aside className="h-fit min-w-0 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <h2 className="text-lg font-medium">{department?.name ?? service.department} Department</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {department?.overview ?? "Contact the hospital for department information."}
            </p>
            {department ? (
              <>
                <h3 className="mt-6 font-medium">Department services</h3>
                <div className="mt-3">
                  <DetailList items={department.services} />
                </div>
                <h3 className="mt-6 font-medium">Facilities</h3>
                <div className="mt-3">
                  <DetailList items={department.facilities} />
                </div>
                <dl className="mt-6 space-y-4 border-t border-border pt-5 text-sm">
                  <div>
                    <dt className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4 text-primary" aria-hidden="true" /> Opening hours
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{department.hours}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-medium">
                      <Phone className="h-4 w-4 text-primary" aria-hidden="true" /> Contact
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{department.contact}</dd>
                  </div>
                </dl>
              </>
            ) : null}
            <h3 className="mt-6 font-medium">Facilities & equipment</h3>
            <div className="mt-3">
              <DetailList items={service.facilities} />
            </div>
            <Button asChild className="mt-7 w-full rounded-full">
              <Link to="/appointments">Request Appointment</Link>
            </Button>
          </aside>
        </div>
      </Section>
      <Section tone="soft">
        <div className="max-w-3xl">
          <SectionHeading title="Frequently Asked Questions" align="left" />
          <Accordion type="single" collapsible className="mt-8">
            {service.faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
      <CtaBand
        title={`Talk to our ${service.name} team`}
        text="Request an appointment and our team will help you plan the next step."
      />
    </>
  );
}
