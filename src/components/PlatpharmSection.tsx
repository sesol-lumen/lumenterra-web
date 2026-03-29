"use client";

import { useEffect, useRef, useState } from "react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
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
            targets.forEach((item) => {
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

const features = [
  {
    icon: "🏥",
    title: "제약사 직거래",
    desc: "유한양행, 종근당, 일양약품 등 국내 주요 제약사의 직거래를 온라인 중개합니다.",
  },
  {
    icon: "⚡",
    title: "영업 효율화",
    desc: "수금 업무 등 불필요한 업무를 최소화하고 업무 본연의 활동에 집중할 수 있습니다.",
  },
  {
    icon: "💊",
    title: "OTC & ETC",
    desc: "일반의약품(OTC) 및 전문의약품(ETC)을 포함한 약국·병의원에 필요한 모든 의약품과 의약외품, 건기식을 한번에 비교 주문 가능합니다.",
  },
];

const partners = [
  { name: "종근당 OTC", desc: "OTC 의약품 전문 직거래" },
  { name: "위고비", desc: "전문 처방 의약품 공급" },
  { name: "유한양행", desc: "종합 제약 솔루션 제공" },
  { name: "일양약품", desc: "자동승인 3영업일 납품" },
  { name: "삼진제약", desc: "선결제 안전 거래" },
];

const targets = [
  { role: "약국 경영자·약사", desc: "의약품 구매 비용 절감 및 발주 업무 효율화" },
  { role: "병원 원무·구매 담당자", desc: "의약품 공급망 안정화 및 거래 투명성 확보" },
  { role: "제약사 영업·마케팅팀", desc: "신규 거래처 확보 및 판매 채널 디지털화" },
];

function PartnerCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % partners.length);
    }, 2800);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  const goTo = (idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrent(idx);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: "36px",
        border: "1px solid #E8EAED",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#347BF6",
          letterSpacing: "2px",
          textTransform: "uppercase" as const,
          marginBottom: 32,
        }}
      >
        파트너 제약사
      </div>

      {/* Slide Content */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: 140,
        }}
      >
        {partners.map((p, i) => (
          <div
            key={p.name}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              opacity: i === current ? 1 : 0,
              transform: i === current ? "translateY(0)" : i < current ? "translateY(-16px)" : "translateY(16px)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#1F1F22",
                letterSpacing: "-1px",
                marginBottom: 12,
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#707378",
                lineHeight: 1.6,
              }}
            >
              {p.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div style={{ display: "flex", gap: 8, marginTop: 32, alignItems: "center" }}>
        {partners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 50,
              background: i === current ? "#347BF6" : "#E8EAED",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontSize: 13,
            color: "#9FA3A8",
            fontWeight: 600,
          }}
        >
          {current + 1} / {partners.length}
        </span>
      </div>
    </div>
  );
}

export default function PlatpharmSection() {
  const ref = useScrollReveal(0.1) as React.RefObject<HTMLElement>;

  return (
    <section
      id="platpharm"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ background: "#F7F8FA", padding: "120px 0" }}
    >
      <div className="container-main">
        {/* Header */}
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
            Service 01
          </span>
        </div>

        <div
          data-reveal
          data-delay="100"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 64,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 800,
                color: "#1F1F22",
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                margin: "0 0 16px",
              }}
            >
              플랫팜
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 500,
                color: "#347BF6",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              약국·병원 의약품 구매를 더 스마트하게
            </p>
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#707378",
              lineHeight: 1.75,
              maxWidth: 400,
              margin: 0,
            }}
          >
            플랫팜은 약국, 병원과 제약사를 직접 연결하는 B2B 의약품
            전자상거래 플랫폼입니다. 복잡한 의약품 유통 구조를 단순화하여
            더 빠르고 투명한 거래 환경을 만듭니다.
          </p>
        </div>

        {/* Big Feature Card */}
        <div
          data-reveal
          data-delay="150"
          style={{
            background: "#000",
            borderRadius: 32,
            padding: "60px 56px",
            marginBottom: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(52,123,246,0.12)",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: "30%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(52,123,246,0.08)",
              filter: "blur(60px)",
            }}
          />
          <div style={{ position: "relative", maxWidth: 600 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#347BF6",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              핵심 가치
            </div>
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.25,
                letterSpacing: "-1px",
                marginBottom: 20,
              }}
            >
              제약사와 약국·병원을
              <br />
              직접 연결합니다
            </h3>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              기존 다단계 유통 구조를 제거하고, 제약사와 의료기관이
              플랫팜을 통해 직접 거래하도록 연결합니다.
              투명한 가격과 신속한 납품으로 양측 모두의 효율을 높입니다.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["선결제 안전 보장", "전자계약 체결", "실시간 발주"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(52,123,246,0.15)",
                    border: "1px solid rgba(52,123,246,0.3)",
                    borderRadius: 50,
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#7EB6FF",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div
          data-reveal
          data-delay="200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "28px 32px",
                border: "1px solid #E8EAED",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(52,123,246,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(52,123,246,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "#E8EAED";
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#1F1F22",
                  marginBottom: 10,
                  letterSpacing: "-0.3px",
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: 14, color: "#707378", lineHeight: 1.7 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Partners & Targets Row */}
        <div
          data-reveal
          data-delay="250"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
          className="platpharm-bottom-grid"
        >
          {/* Partners Carousel */}
          <PartnerCarousel />

          {/* Target Customers */}
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "36px",
              border: "1px solid #E8EAED",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#347BF6",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              도입 대상
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {targets.map((t, i) => (
                <div key={t.role} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(52,123,246,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#347BF6",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1F1F22", marginBottom: 4 }}>
                      {t.role}
                    </div>
                    <div style={{ fontSize: 13, color: "#707378", lineHeight: 1.6 }}>
                      {t.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .platpharm-bottom-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
