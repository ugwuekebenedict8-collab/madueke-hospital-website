import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HOSPITAL, NAV_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2" aria-label={`${HOSPITAL.name} home`}>
      <img
        src="/logo.png"
        alt=""
        width={48}
        height={48}
        className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
      />
      <span className="min-w-0 max-w-[10rem] sm:max-w-none">
        <span className="block truncate text-sm font-semibold leading-tight sm:text-base">
          {HOSPITAL.name}
        </span>
        <span className="hidden truncate text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:block">
          Hospital
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/90 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-b border-border shadow-soft" : "border-b border-transparent",
      )}
    >
      <div className="container-page flex min-h-18 items-center justify-between gap-2 py-2.5 sm:gap-4 sm:py-3">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm" className="rounded-full font-medium">
            <Link to="/emergency">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Emergency
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-full font-medium">
            <Link to="/appointments">Book Appointment</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open menu"
              className="min-h-11 min-w-11 rounded-full xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm p-0 [&>button]:hidden">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  className="min-h-11 min-w-11 rounded-full"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        activeOptions={{ exact: item.to === "/" }}
                        activeProps={{ className: "bg-secondary text-primary" }}
                        className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-foreground transition-colors hover:bg-surface"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-2 border-t border-border p-4">
                <Button asChild className="min-h-12 w-full rounded-full text-base">
                  <Link to="/appointments" onClick={() => setOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="min-h-12 w-full rounded-full text-base"
                >
                  <Link to="/emergency" onClick={() => setOpen(false)}>
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Emergency Care
                  </Link>
                </Button>
                <p className="pt-1 text-center text-xs text-muted-foreground">
                  Emergency: {HOSPITAL.emergencyPhone}
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
