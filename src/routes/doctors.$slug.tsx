import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, CalendarDays, Languages, Building2, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorAvatar } from "@/components/site/cards";
import { PageHero, Section } from "@/components/site/primitives";
import { TEAM } from "@/data/site";
import { pageMeta } from "@/lib/seo";
export const Route = createFileRoute("/doctors/$slug")({
  loader: ({ params }) => {
    const member = TEAM.find((person) => person.slug === params.slug);
    if (!member) throw notFound();
    return { member };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(
        loaderData.member.name,
        `${loaderData.member.specialty} profile and contact information.`,
      )
      : pageMeta("Doctor Not Found", "The requested doctor profile could not be found."),
  component: Profile,
  notFoundComponent: () => (
    <Section>
      <h1 className="text-3xl">Team profile not found</h1>
      <Button asChild className="mt-6">
        <Link to="/doctors">All team members</Link>
      </Button>
    </Section>
  ),
  errorComponent: ({ reset }) => (
    <Section>
      <h1 className="text-3xl">Profile unavailable</h1>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </Section>
  ),
});
function Profile() {
  const { member: d } = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Team profile"
        title={d.name}
        description={`${d.specialty} · ${d.department}`}
        crumbs={[{ label: "Our Team", to: "/doctors" }, { label: d.name }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside>
            <DoctorAvatar name={d.name} image={d.image} className="max-w-full" />
            {d.bookable ? (
              <Button asChild className="mt-5 w-full rounded-full">
                <Link to="/appointments">Book Appointment</Link>
              </Button>
            ) : null}
          </aside>
          <div>
            <h2 className="mt-8 text-2xl">Biography</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
              {d.slug === "nurse-ineh-modesta" ? (
                <>
                  <strong className="font-semibold text-foreground">Ineh Modesto</strong>
                  {d.bio.slice("Ineh Modesto".length)}
                </>
              ) : (
                d.bio
              )}
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Info icon={Building2} title="Department" value={d.department} />
              {d.age ? <Info icon={UserRound} title="Age" value={d.age} /> : null}
              {d.qualification ? (
                <Info icon={Check} title="Qualification" value={d.qualification} />
              ) : null}
              {d.experience ? (
                <Info icon={Check} title="Experience" value={d.experience} />
              ) : null}
              {d.consultation ? (
                <Info icon={CalendarDays} title="Consultation" value={d.consultation} />
              ) : null}
              {d.languages ? (
                <Info icon={Languages} title="Languages" value={d.languages.join(", ")} />
              ) : null}
              {d.phone ? <Info icon={Phone} title="Contact" value={d.phone} /> : null}
              <Info icon={CalendarDays} title="Availability" value={d.availability} />
            </div>
            {d.expertise.length ? (
              <>
                <h2 className="mt-10 text-2xl">Areas of Expertise</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {d.expertise.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
function Info({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Building2;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value}</p>
    </div>
  );
}
