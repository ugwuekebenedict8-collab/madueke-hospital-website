import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { TeamMemberCard } from "@/components/site/cards";
import { PageHero, Section } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TEAM } from "@/data/site";
import { pageMeta } from "@/lib/seo";
export const Route = createFileRoute("/doctors/")({
  head: () =>
    pageMeta(
      "Our Care Team",
      "Meet the clinicians and hospital professionals supporting care at Madueke Memorial Hospital.",
    ),
  component: DoctorsPage,
});
function DoctorsPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      TEAM.filter((member) =>
        `${member.name} ${member.specialty} ${member.department}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      ),
    [search],
  );
  return (
    <>
      <PageHero
        eyebrow="Our people"
        title="Meet Our Care Team"
        description="Meet the clinicians and professionals who care for patients and support the hospital."
      />
      <Section>
        <div className="grid min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <label className="relative min-w-0">
            <span className="sr-only">Search the care team</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, role or department"
              className="min-h-11 w-full rounded-full pl-11"
            />
          </label>
        </div>
        {filtered.length ? (
          <div className="mt-8 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((member) => (
              <TeamMemberCard key={member.slug} member={member} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-border bg-surface p-10 text-center">
            <h2 className="text-lg">No team members found</h2>
            <p className="mt-2 text-sm text-muted-foreground">Try another name or role.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
              }}
              className="mt-5 rounded-full"
            >
              Clear filters
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}
