"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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

// 순서: 유한양행(로고 없어서 텍스트 처리)→종근당→신신제약→일양약품→삼진제약→경방신약→옵투스제약→셀로맥스→더유제약
const marqueePartners = [
  { name: "유한양행", logo: null },
  { name: "종근당", logo: "/logos/종근당.jpg" },
  { name: "신신제약", logo: "/logos/신신제약.jpg" },
  { name: "일양약품", logo: "/logos/일양약품.svg" },
  { name: "삼진제약", logo: "/logos/삼진제약.png" },
  { name: "경방신약", logo: "/logos/경방신약.jpg" },
  { name: "옵투스제약", logo: "/logos/옵투스제약.png" },
  { name: "셀로맥스", logo: "/logos/셀로맥스.jpg" },
  { name: "더유제약", logo: "/logos/더유제약.webp" },
];

// 무한 루프를 위해 3번 복제
const marqueeItems = [...marqueePartners, ...marqueePartners, ...marqueePartners];

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
          {features.map((f) => (
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

        {/* Partner Marquee */}
        <div data-reveal data-delay="250">
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "36px 0",
              border: "1px solid #E8EAED",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#347BF6",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 28,
                paddingLeft: 36,
              }}
            >
              파트너 제약사
            </div>

            {/* Marquee track */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* 좌우 페이드 마스크 */}
              <div className="marquee-fade-left" />
              <div className="marquee-fade-right" />

              <div className="marquee-track">
                {marqueeItems.map((p, i) => (
                  <div key={i} className="marquee-item">
                    {/* 로고 박스 */}
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 16,
                        border: "1px solid #E8EAED",
                        background: "#F7F8FA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      {p.logo ? (
                        <Image
                          src={p.logo}
                          alt={p.name}
                          width={64}
                          height={64}
                          style={{ objectFit: "contain", width: 64, height: 64 }}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: "#347BF6",
                            textAlign: "center",
                            lineHeight: 1.3,
                          }}
                        >
                          {p.name}
                        </span>
                      )}
                    </div>
                    {/* 제약사명 */}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1F1F22",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
          padding: 4px 0 8px;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 96px;
          flex-shrink: 0;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-fade-left,
        .marquee-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-fade-left {
          left: 0;
          background: linear-gradient(to right, #fff, transparent);
        }
        .marquee-fade-right {
          right: 0;
          background: linear-gradient(to left, #fff, transparent);
        }
      `}</style>
    </section>
  );
}
