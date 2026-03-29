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

  // 모바일 메뉴 열릴 때 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "회사소개", href: "#company" },
    { label: "플랫팜", href: "#platpharm" },
    { label: "약콕", href: "#yakkok" },
    { label: "보도자료", href: "#press" },
    { label: "문의하기", href: "#contact" },
  ];

  const linkColor = scrolled ? "#1F1F22" : "rgba(255,255,255,0.85)";

  return (
    <>
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
          style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.5px",
              color: menuOpen ? "#1F1F22" : linkColor,
              textDecoration: "none",
              transition: "color 0.25s ease",
              zIndex: 101,
            }}
          >
            LUMENTERRA
          </a>

          {/* Desktop Nav */}
          <nav className="header-nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: linkColor,
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: 8,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = scrolled ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.15)";
                  (e.target as HTMLElement).style.color = scrolled ? "#1F1F22" : "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = linkColor;
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="header-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 101 }}
          >
            {/* 햄버거 ↔ X 아이콘 */}
            <div style={{ width: 22, height: 16, position: "relative" }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 22,
                    height: 2,
                    background: menuOpen ? "#1F1F22" : (scrolled ? "#1F1F22" : "#fff"),
                    borderRadius: 2,
                    transition: "all 0.25s ease",
                    top: i === 0 ? 0 : i === 1 ? 7 : 14,
                    opacity: menuOpen && i === 1 ? 0 : 1,
                    transform: menuOpen && i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-7px) rotate(-45deg)"
                      : "none",
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          padding: "80px 24px 40px",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1F1F22",
              textDecoration: "none",
              padding: "16px 0",
              borderBottom: "1px solid #F0F1F2",
              transition: "color 0.2s ease",
              transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(8px)",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#347BF6"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#1F1F22"; }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        .header-nav-desktop {
          display: none;
          gap: 4px;
        }
        .header-hamburger {
          display: block;
        }
        @media (min-width: 768px) {
          .header-nav-desktop {
            display: flex;
          }
          .header-hamburger {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
