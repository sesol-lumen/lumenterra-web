"use client";

import { useEffect, useRef } from "react";

function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(24px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = (entry.target as HTMLElement).querySelectorAll<HTMLElement>("[data-reveal]");
            targets.forEach((item, i) => {
              const delay = parseInt(item.getAttribute("data-delay") || "0");
              setTimeout(() => {
                item.style.transition = "opacity 0.65s ease, transform 0.65s ease";
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export default function CompanySection() {
  const ref = useScrollReveal(0.15);

  const values = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 2L26 8v12l-12 6L2 20V8L14 2z" stroke="#347BF6" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M14 2v24M2 8l12 6 12-6" stroke="#347BF6" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      ),
      title: "디지털 혁신",
      desc: "아날로그에 머물러 있던 헬스케어 유통 구조를 디지털로 전환합니다.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="#347BF6" strokeWidth="1.8"/>
          <path d="M9 14l3.5 3.5L19 10" stroke="#347BF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "신뢰 기반 연결",
      desc: "약국·병원·제약사·소비자를 신뢰할 수 있는 플랫폼으로 연결합니다.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 20l8-8 4 4 8-10" stroke="#347BF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="22" cy="6" r="3" stroke="#347BF6" strokeWidth="1.8"/>
        </svg>
      ),
      title: "데이터 인텔리전스",
      desc: "거래 데이터를 분석해 더 나은 의사결정을 지원하는 인사이트를 제공합니다.",
    },
  ];

  return (
    <section id="company" ref={ref} style={{ background: "#fff", padding: "120px 0" }}>
      <div className="container-main">
        {/* Label */}
        <div data-reveal data-delay="0" style={{ marginBottom: 16 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#347BF6",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Company
          </span>
        </div>

        {/* Heading */}
        <div
          data-reveal
          data-delay="100"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 72,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              color: "#1F1F22",
              lineHeight: 1.2,
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            헬스케어 유통의
            <br />새로운 기준을 만듭니다
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#707378",
              lineHeight: 1.75,
              maxWidth: 380,
              margin: 0,
            }}
          >
            (주)루멘테라는 플랫팜과 약콕 두 가지 서비스를 통해
            <br />
            B2B 의약품 거래와 B2C 약국 O2O를 동시에 혁신하는
            <br />
            헬스케어 테크 스타트업입니다.
          </p>
        </div>

        {/* Value Cards */}
        <div
          data-reveal
          data-delay="200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 72,
          }}
        >
          {values.map((v) => (
            <div key={v.title} className="value-card">
              <div style={{ marginBottom: 24 }}>{v.icon}</div>
              <div className="value-card-title">{v.title}</div>
              <div className="value-card-desc">{v.desc}</div>
            </div>
          ))}
        </div>

        {/* Services Overview */}
        <div
          data-reveal
          data-delay="300"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
          className="company-services-grid"
        >
          <a
            href="#platpharm"
            style={{
              display: "block",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              borderRadius: 24,
              padding: "48px 40px",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "rgba(52,123,246,0.15)",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#347BF6",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              B2B · 거래 플랫폼
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-1px",
                marginBottom: 12,
              }}
            >
              플랫팜
            </div>
            <div
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              약국·병원과 제약사를 직접 연결하는
              <br />B2B 의약품 전자상거래 플랫폼
            </div>
            <div
              style={{
                marginTop: 32,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: "#347BF6",
              }}
            >
              자세히 보기
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>

          <a
            href="#yakkok"
            style={{
              display: "block",
              background: "linear-gradient(135deg, #1e1030 0%, #2d1b5e 100%)",
              borderRadius: 24,
              padding: "48px 40px",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "rgba(124,92,246,0.2)",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#A78BFA",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              B2C · 약국 O2O
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-1px",
                marginBottom: 12,
              }}
            >
              약콕
            </div>
            <div
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              소비자와 약국을 연결하는
              <br />약국 O2O 성장 플랫폼
            </div>
            <div
              style={{
                marginTop: 32,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: "#A78BFA",
              }}
            >
              자세히 보기
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        .value-card {
          background: #F7F8FA;
          border-radius: 24px;
          padding: 36px;
          transition: background 0.25s ease, transform 0.2s ease;
          cursor: default;
        }
        .value-card:hover {
          background: #000;
          transform: translateY(-4px);
        }
        .value-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #1F1F22;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
          transition: color 0.25s ease;
        }
        .value-card:hover .value-card-title {
          color: #fff;
        }
        .value-card-desc {
          font-size: 15px;
          color: #707378;
          line-height: 1.7;
          transition: color 0.25s ease;
        }
        .value-card:hover .value-card-desc {
          color: rgba(255,255,255,0.6);
        }
        @media (max-width: 640px) {
          .company-services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
