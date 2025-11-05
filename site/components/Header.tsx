"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Me", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "resume", label: "Resume", href: "#resume" },
];

export default function Header() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "backdrop-blur bg-black/50 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container-section flex items-center justify-between py-3">
        <Link href="#home" className="flex items-center gap-2 text-white/90 hover-light rounded-full px-2 py-1">
          <span className="hidden sm:block font-semibold tracking-tight">Raiyan Haque</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative px-3 py-2 rounded-full text-sm text-white/80 hover:text-white transition-colors hover-light"
            >
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


