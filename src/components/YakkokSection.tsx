"use client";

import { useEffect, useRef } from "react";

function useScrollReveal(threshold = 0.1) {
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

const consumerFeatures = [
  {
    step: "01",
    title: "내 주변 약국 재고 확인",
    desc: "위치 기반으로 탐색한 상품의 재고 가능성이 높은 약국부터 안내합니다.",
    color: "#7C5CF6",
  },
  {
    step: "02",
    title: "찾고, 문의하고, 예약까지",
    desc: "약국 운영 정보·위치 확인, 전화 문의, 상품 재고 예약이 가능합니다.",
    color: "#7C5CF6",
  },
  {
    step: "03",
    title: "영수증 데이터로 더 정확하게",
    desc: "영수증 인증 이벤트로 실제 구매 데이터를 수집해 재고 정확도를 높입니다.",
    color: "#7C5CF6",
  },
];

const pharmacyBenefits = [
  {
    icon: "🎯",
    title: "타깃 기반 유입 강화",
    desc: "약국 전 제품을 탐색하는 고객에게 직접 연결, 구매 가능성 높은 방문객을 확보합니다.",
  },
  {
    icon: "📈",
    title: "오프라인 매출 증대",
    desc: "사전 재고 확인을 통한 사용자의 실제 방문 및 오프라인 구매 전환을 지원합니다.",
  },
  {
    icon: "💾",
    title: "데이터 자산 확보",
    desc: "소비자 행동 데이터를 수집해 상품 검색, 조회, 재고 관리 최적화에 활용합니다.",
  },
];


export default function YakkokSection() {
  const ref = useScrollReveal(0.1) as React.RefObject<HTMLElement>;

  return (
    <section
      id="yakkok"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ background: "#fff", padding: "120px 0" }}
    >
      <div className="container-main">
        {/* Header */}
        <div data-reveal data-delay="0" style={{ marginBottom: 16 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#7C5CF6",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Service 02
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
              약콕
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 500,
                color: "#7C5CF6",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              약국의 가치를 온라인으로 확장합니다
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
            약콕은 소비자와 약국을 연결하는 O2O 플랫폼입니다.
            약국 방문 전 원하는 상품의 재고를 확인하고,
            약국은 새로운 고객 유입과 매출 성장을 경험합니다.
          </p>
        </div>

        {/* Hero Banner */}
        <div
          data-reveal
          data-delay="150"
          style={{
            background: "linear-gradient(135deg, #2D1B69 0%, #1A0A4A 100%)",
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
              top: -60,
              right: -60,
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: "rgba(124,92,246,0.2)",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: "20%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "rgba(167,139,250,0.15)",
              filter: "blur(60px)",
            }}
          />
          <div style={{ position: "relative", maxWidth: 600 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#A78BFA",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              소비자 앱 · 약국 O2O
            </div>
            <h3
              style={{
                fontSize: "clamp(22px, 3vw, 38px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.3,
                letterSpacing: "-1px",
                marginBottom: 20,
              }}
            >
              약국 방문 전,
              <br />
              약콕을 먼저 켜는 습관을 만듭니다
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: 32,
              }}
            >
              인플루언서 콘텐츠, 즉 제품 섭취 과정을 생활 밀착형 정보로 사용자의
              생활 안에 자연스럽게 약콕을 사용하는 행동을 노출합니다.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["재고 사전 확인", "약국 직접 예약", "지역 약국 탐색"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(124,92,246,0.2)",
                    border: "1px solid rgba(124,92,246,0.4)",
                    borderRadius: 50,
                    padding: "6px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#C4B5FD",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Two Column: Consumer Features + Pharmacy Benefits */}
        <div
          data-reveal
          data-delay="200"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 24,
          }}
          className="yakkok-two-col"
        >
          {/* Consumer Features */}
          <div
            style={{
              background: "#FAF9FF",
              borderRadius: 24,
              padding: "36px",
              border: "1px solid #EDE9FF",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7C5CF6",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              소비자 주요 기능
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {consumerFeatures.map((f, i) => (
                <div
                  key={f.step}
                  style={{
                    display: "flex",
                    gap: 16,
                    paddingBottom: i < consumerFeatures.length - 1 ? 20 : 0,
                    marginBottom: i < consumerFeatures.length - 1 ? 20 : 0,
                    borderBottom: i < consumerFeatures.length - 1 ? "1px solid #EDE9FF" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(124,92,246,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#7C5CF6",
                    }}
                  >
                    {f.step}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1F1F22",
                        marginBottom: 4,
                      }}
                    >
                      {f.title}
                    </div>
                    <div style={{ fontSize: 13, color: "#707378", lineHeight: 1.6 }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pharmacy Benefits */}
          <div
            style={{
              background: "#FAF9FF",
              borderRadius: 24,
              padding: "36px",
              border: "1px solid #EDE9FF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7C5CF6",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              약국·브랜드 기대 효과
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {pharmacyBenefits.map((b, i) => (
                <div
                  key={b.title}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    paddingBottom: i < pharmacyBenefits.length - 1 ? 24 : 0,
                    borderBottom: i < pharmacyBenefits.length - 1 ? "1px solid #EDE9FF" : "none",
                  }}
                >
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{b.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1F1F22",
                        marginBottom: 4,
                      }}
                    >
                      {b.title}
                    </div>
                    <div style={{ fontSize: 13, color: "#707378", lineHeight: 1.6 }}>
                      {b.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .yakkok-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
