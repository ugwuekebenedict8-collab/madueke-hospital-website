import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero, PlaceholderNote, Section, IconBadge } from "@/components/site/primitives";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DEPARTMENTS, SERVICES, SERVICE_CATEGORIES } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageMeta(
      "Services & Departments",
      "Explore hospital services alongside the departments and facilities that deliver them.",
    ),
  component: ServicesPage,
});

function ServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(
    () =>
      SERVICES.filter((service) => {
        const department = DEPARTMENTS.find((item) => item.name === service.department);
        const content = [
          service.name,
          service.short,
          service.department,
          department?.short,
          ...(department?.services ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return (
          (category === "All" || service.category === category) &&
          content.includes(search.trim().toLowerCase())
        );
      }),
    [search, category],
  );

  return (
    <>
      <PageHero
        eyebrow="Care directory"
        title="Services & Departments"
        description="Explore the care we provide and the teams, facilities and hours behind each service."
      />
      <Section>
        <div className="flex flex-col gap-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search services and departments</span>
              <Search
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search services or departments"
                className="min-h-12 rounded-full pl-11"
              />
            </label>
            <div className="flex flex-wrap gap-2" aria-label="Filter services by category">
              {SERVICE_CATEGORIES.map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={category === item ? "default" : "outline"}
                  onClick={() => setCategory(item)}
                  className="rounded-full"
                  aria-pressed={category === item}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <PlaceholderNote>
            Service descriptions are general information and should be clinically reviewed before
            publication.
          </PlaceholderNote>
          {filtered.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => {
                const department = DEPARTMENTS.find(
                  (item) => item.name === service.department,
                );
                return (
                  <article
                    key={service.slug}
                    className="group flex min-w-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
                  >
                    <IconBadge icon={service.icon} />
                    <p className="mt-5 text-xs font-medium uppercase tracking-wider text-primary">
                      {service.category}
                    </p>
                    <h2 className="mt-2 break-words text-lg font-medium">{service.name}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.short}
                    </p>
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Department
                      </p>
                      <h3 className="mt-1 font-medium">{department?.name ?? service.department}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {department?.short ?? "Contact the hospital for department information."}
                      </p>
                      {department ? (
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          Services: {department.services.join(", ")}
                        </p>
                      ) : null}
                    </div>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="mt-5 inline-flex min-h-10 items-center gap-2 self-start text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      View service and department details
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface p-10 text-center">
              <h2 className="text-lg">No services found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
