"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800, startSignal: { start: boolean }) {
  const [count, setCount] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    if (!startSignal.start || triggered.current) return;
    triggered.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeInOutCubic — 초반 천천히 시작해서 중간에 빠르게, 끝에 부드럽게 마무리
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [startSignal.start, target, duration]);

  return count;
}

function StatsBlock() {
  const [started, setStarted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const signal = { start: started };
  const count1 = useCountUp(16000, 1800, signal);
  const count2 = useCountUp(60, 1800, signal);

  return (
    <div
      ref={wrapRef}
      style={{ display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}
    >
      {[
        { count: count1, suffix: "+", label: "약국 및 병의원 회원", big: true },
        { count: count2, suffix: "+", label: "주요 파트너사", big: false },
      ].map((stat) => (
        <div key={stat.label}>
          <div
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1px",
            }}
          >
            {stat.big ? stat.count.toLocaleString() : stat.count}{stat.suffix}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              marginTop: 4,
              fontWeight: 500,
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-hero]");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      const delay = i * 150;
      setTimeout(() => {
        item.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 300 + delay);
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(52,123,246,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,92,246,0.2) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-main"
        style={{ position: "relative", paddingTop: 100, paddingBottom: 160 }}
      >
        {/* Label */}
        <div data-hero style={{ marginBottom: 28 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(52,123,246,0.15)",
              border: "1px solid rgba(52,123,246,0.3)",
              borderRadius: 50,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: "#7EB6FF",
              letterSpacing: "0.3px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#347BF6",
                display: "inline-block",
                boxShadow: "0 0 6px #347BF6",
              }}
            />
            헬스케어 유통의 디지털 혁신
          </span>
        </div>

        {/* Headline */}
        <h1
          data-hero
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.15,
            letterSpacing: "-2px",
            marginBottom: 28,
            maxWidth: 800,
          }}
        >
          의약품 유통,
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #347BF6 0%, #7C5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            더 스마트하게
          </span>
        </h1>

        {/* Subheadline */}
        <p
          data-hero
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            marginBottom: 48,
            maxWidth: 520,
          }}
        >
          루멘테라는 B2B 의약품 거래 플랫폼 <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>플랫팜</strong>과
          약국 O2O 앱 <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>약콕</strong>을 통해
          헬스케어 유통 생태계를 연결합니다.
        </p>

        {/* CTA Buttons */}
        <div
          data-hero
          style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <a
            href="#platpharm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 50,
              textDecoration: "none",
              letterSpacing: "-0.3px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#347BF6";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            플랫팜 알아보기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#yakkok"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 50,
              textDecoration: "none",
              letterSpacing: "-0.3px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#347BF6";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            약콕 알아보기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Stats */}
        <StatsBlock />
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.5,
        }}
      >
        <span style={{ fontSize: 11, color: "#fff", letterSpacing: "2px", fontWeight: 600 }}>
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, #fff, transparent)",
          }}
        />
      </div>
    </section>
  );
}
