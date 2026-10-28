import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Star, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/site/primitives";
import type { Article, Department, Service, TeamMember } from "@/data/site";
import { cn } from "@/lib/utils";

const cardBase =
  "group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift";

export function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className={cardBase}>
      <IconBadge icon={icon} />
      <h3 className="mt-5 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </article>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={cardBase}>
      <IconBadge icon={service.icon} />
      <h3 className="mt-5 text-lg font-medium">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
      >
        Learn More
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <article className={cardBase}>
      <IconBadge icon={department.icon} />
      <h3 className="mt-5 text-lg font-medium">{department.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{department.short}</p>
      <ul className="mt-4 flex flex-1 flex-wrap gap-1.5">
        {department.services.map((s) => (
          <li
            key={s}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-accent-foreground"
          >
            {s}
          </li>
        ))}
      </ul>
      <Link
        to="/departments/$slug"
        params={{ slug: department.slug }}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
      >
        View Department
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}

export function DoctorAvatar({
  name,
  image,
  className,
}: {
  name: string;
  image?: string;
  className?: string;
}) {
  const initials = name.replace("Dr. ", "").replace(/[^A-Za-z0-9 ]/g, "").trim().slice(0, 2) || "DR";
  return (
    <div
      className={cn(
        "relative grid aspect-square w-full place-items-center overflow-hidden rounded-2xl bg-secondary text-2xl font-semibold text-primary",
        className,
      )}
      role="img"
      aria-label={`Portrait of ${name}`}
    >
      {image ? (
        <img
          src={image}
          alt={`${name} portrait`}
          className="absolute inset-0 block h-full w-full max-w-full rounded-[inherit] object-cover"
        />
      ) : (
        initials.toUpperCase()
      )}
    </div>
  );
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className={cn(cardBase, "min-w-0 gap-0")}>
      <DoctorAvatar name={member.name} image={member.image} className="max-w-28" />
      <h3 className="mt-5 break-words text-lg font-medium">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-primary">{member.specialty}</p>
      <p className="mt-1 text-sm text-muted-foreground">{member.department}</p>
      <dl className="mt-3 flex-1 space-y-1 text-sm text-muted-foreground">
        {member.experience ? (
          <div className="flex min-w-0 flex-wrap gap-1.5">
            <dt className="font-medium text-foreground">Experience:</dt>
            <dd className="min-w-0 break-words">{member.experience}</dd>
          </div>
        ) : null}
        <div className="flex min-w-0 flex-wrap gap-1.5">
          <dt className="font-medium text-foreground">Availability:</dt>
          <dd className="min-w-0 break-words">{member.availability}</dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline" className="rounded-full">
          <Link to="/doctors/$slug" params={{ slug: member.slug }}>
            View Profile
          </Link>
        </Button>
        {member.bookable ? (
          <Button asChild size="sm" className="rounded-full">
            <Link to="/appointments">Book Appointment</Link>
          </Button>
        ) : null}
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="aspect-16/10 w-full overflow-hidden bg-secondary">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          className="block h-full w-full max-w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-accent-foreground">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {new Date(article.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-medium">{article.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <Link
          to="/resources/$slug"
          params={{ slug: article.slug }}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          Read Article
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial: { name: string; initials: string; rating: number; text: string };
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-1" aria-label={`Rated ${testimonial.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating ? "fill-primary text-primary" : "text-border",
            )}
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{testimonial.rating}.0</span>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        “{testimonial.text}”
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary"
          aria-hidden="true"
        >
          {testimonial.initials}
        </span>
        <span className="text-sm font-medium">{testimonial.name}</span>
      </div>
    </article>
  );
}

export function StatCard({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
      <p className="text-3xl font-bold text-primary sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-medium">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
