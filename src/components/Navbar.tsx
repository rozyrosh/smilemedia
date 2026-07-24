"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks } from "@/data/content";

function resolveNavHref(href: string, pathname: string) {
  if (href.startsWith("#") && pathname !== "/") {
    return `/${href}`;
  }
  return href;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <motion.header
        className={`site-nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
          <Image
            src="/assets/images/logo2.png"
            alt="Smile Media"
            width={140}
            height={40}
            priority
          />
        </Link>

        <button
          type="button"
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Desktop links stay in the header */}
        <nav className="nav-links nav-links-desktop" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={resolveNavHref(link.href, pathname)}
                  className={link.cta ? "nav-cta" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Mobile drawer is outside motion.header so fixed positioning isn't trapped by transform */}
      <nav
        className={`nav-links nav-links-mobile ${open ? "open" : ""}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={resolveNavHref(link.href, pathname)}
                className={link.cta ? "nav-cta" : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`nav-backdrop ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
    </>
  );
}
