"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "회사소개", href: "#company" },
    { label: "플랫팜", href: "#platpharm" },
    { label: "약콕", href: "#yakkok" },
    { label: "보도자료", href: "#press" },
    { label: "문의하기", href: "#contact" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        zIndex: 100,
        transition: "background 0.25s ease, box-shadow 0.25s ease",
        background: scrolled ? "#fff" : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div
        className="container-main"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "-0.5px",
            color: scrolled ? "#1F1F22" : "#fff",
            textDecoration: "none",
            transition: "color 0.25s ease",
          }}
        >
          LUMENTERRA
        </a>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", gap: 4 }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: scrolled ? "#1F1F22" : "rgba(255,255,255,0.85)",
                textDecoration: "none",
                padding: "7px 14px",
                borderRadius: 8,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = scrolled
                  ? "rgba(0,0,0,0.06)"
                  : "rgba(255,255,255,0.15)";
                (e.target as HTMLElement).style.color = scrolled
                  ? "#1F1F22"
                  : "#fff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = scrolled
                  ? "#1F1F22"
                  : "rgba(255,255,255,0.85)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:block"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: scrolled ? "#fff" : "#000",
            background: scrolled ? "#347BF6" : "#fff",
            padding: "8px 20px",
            borderRadius: 50,
            textDecoration: "none",
            transition: "all 0.2s ease",
            letterSpacing: "-0.2px",
          }}
        >
          도입 문의
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: scrolled ? "#1F1F22" : "#fff",
                borderRadius: 2,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            gap: 4,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#1F1F22",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid #F0F1F2",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 20,
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              background: "#347BF6",
              padding: "14px 24px",
              borderRadius: 50,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            도입 문의
          </a>
        </div>
      )}
    </header>
  );
}
