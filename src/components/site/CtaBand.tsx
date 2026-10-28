import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function CtaBand({
  title = "Your Health Deserves the Right Care.",
  text = "Schedule an appointment with one of our healthcare professionals.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-strong px-6 py-14 text-center sm:px-12">
          <span
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-background/60"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-background/40"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/appointments">Book an Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
