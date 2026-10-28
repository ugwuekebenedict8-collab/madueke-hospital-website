import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

import { HOSPITAL } from "@/data/site";

const quickLinks = [
  { label: "About", to: "/about" },
  { label: "Care Directory", to: "/services" },
  { label: "Our Team", to: "/doctors" },
  { label: "Appointments", to: "/appointments" },
  { label: "Contact", to: "/contact" },
];

const patientLinks = [
  { label: "Patient Information", to: "/patients" },
  { label: "Insurance & Billing", to: "/patients" },
  { label: "FAQ", to: "/faq" },
  { label: "Medical Records", to: "/patients" },
  { label: "Health Resources", to: "/resources" },
  { label: "Careers", to: "/careers" },
];

const socials = [
  { label: "Facebook", icon: Facebook },
  { label: "Twitter", icon: Twitter },
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="border-t border-footer bg-footer text-white">
      <div className="container-page py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src="/logo.png"
                alt=""
                width={48}
                height={48}
                className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
              />
              <span className="truncate text-base font-semibold">{HOSPITAL.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              {HOSPITAL.description}
            </p>
            <ul className="mt-5 flex gap-2">
              {socials.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={`${HOSPITAL.name} on ${label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white/75 transition-colors hover:border-white hover:bg-white/20 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-sm font-semibold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Patient resources">
            <h2 className="text-sm font-semibold text-white">Patient Resources</h2>
            <ul className="mt-4 space-y-2.5">
              {patientLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{HOSPITAL.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{HOSPITAL.phone}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{HOSPITAL.email}</span>
              </li>
              <li className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5">
                <span className="block text-xs font-medium uppercase tracking-wider text-white">
                  Emergency
                </span>
                <span className="text-white">{HOSPITAL.emergencyPhone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/65">
            © {new Date().getFullYear()} {HOSPITAL.name}. All rights reserved. Content on this site
            is placeholder information.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/65">
            <li>
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-white">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
