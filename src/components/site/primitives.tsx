import { Link } from "@tanstack/react-router";
import { ChevronRight, Expand, Info, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "soft" | "blue";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "soft" && "bg-surface",
        tone === "blue" && "bg-surface-strong",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function IconBadge({
  icon: Icon,
  className,
  size = "md",
}: {
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary",
        size === "md" ? "h-12 w-12" : "h-10 w-10",
        className,
      )}
      aria-hidden="true"
    >
      <Icon className={size === "md" ? "h-6 w-6" : "h-5 w-5"} strokeWidth={1.6} />
    </span>
  );
}

export function InteractiveImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Expand image: ${alt}`}
          className={cn(
            "group relative block w-full overflow-hidden bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            className,
          )}
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            className={cn(
              "block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none",
              imageClassName,
            )}
          />
          <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground shadow-soft transition-transform group-hover:scale-105">
            <Expand className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[min(96vw,80rem)] max-w-none border-0 bg-transparent p-2 shadow-none [&>button]:text-white sm:rounded-xl">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <img
          src={src}
          alt={alt}
          className="max-h-[88svh] w-full rounded-lg object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-page py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl animate-fade-up">
          {crumbs ? (
            <div className="mb-6">
              <Breadcrumbs items={crumbs} />
            </div>
          ) : null}
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </header>
  );
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}
