"use client";

import { useEffect, useRef } from "react";

function useScrollReveal() {
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
            entry.target.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

type PressItem = {
  type: "news" | "youtube";
  title: string;
  source: string;
  date: string;
  url: string;
  desc?: string;
};

const pressItems: PressItem[] = [
  {
    type: "youtube",
    title: "루멘테라는 어떻게 1년 만에 전국 약국의 절반을 플랫폼에 입점시켰을까?",
    source: "YouTube",
    date: "2026.03.05",
    url: "https://youtu.be/tA5bchHqYzE?si=IBRbhxyE-VTVdOfU",
    desc: "루멘테라 대표 인터뷰 — 1년 만에 전국 약국 절반을 플랫폼에 입점시킨 전략과 성장 스토리를 소개합니다.",
  },
  {
    type: "news",
    title: "일양약품, 직거래 플랫폼 '플랫팜' 입점",
    source: "프레스맨",
    date: "2026.02.12",
    url: "https://www.pressman.kr/news/articleView.html?idxno=99910",
    desc: "일양약품이 루멘테라의 B2B 의약품 직거래 플랫폼 플랫팜에 입점해 약국과의 직거래를 확대한다.",
  },
  {
    type: "news",
    title: "루멘테라, 유니포스트 전자계약 API 솔루션 도입…제약-약국 직거래 DX 가속",
    source: "데이터뉴스",
    date: "2026.01.19",
    url: "https://www.datanews.co.kr/news/article.html?no=142872",
    desc: "루멘테라가 유니포스트의 전자계약 API 솔루션을 도입해 제약사와 약국 간 직거래 디지털 전환을 가속화한다.",
  },
];

function TypeBadge({ type }: { type: PressItem["type"] }) {
  const isYoutube = type === "youtube";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: 50,
        background: isYoutube ? "rgba(255,0,0,0.1)" : "rgba(52,123,246,0.1)",
        color: isYoutube ? "#FF0000" : "#347BF6",
        border: `1px solid ${isYoutube ? "rgba(255,0,0,0.2)" : "rgba(52,123,246,0.2)"}`,
      }}
    >
      {isYoutube ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )}
      {isYoutube ? "YouTube" : "뉴스"}
    </span>
  );
}

export default function PressSection() {
  const ref = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section
      id="press"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ background: "#F7F8FA", padding: "120px 0" }}
    >
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
            Press
          </span>
        </div>

        {/* Heading */}
        <div data-reveal data-delay="100" style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              color: "#1F1F22",
              lineHeight: 1.2,
              letterSpacing: "-1.5px",
              margin: "0 0 16px",
            }}
          >
            보도자료 및 미디어
          </h2>
          <p style={{ fontSize: 16, color: "#707378", lineHeight: 1.75, margin: 0 }}>
            루멘테라의 소식과 미디어 자료를 확인하세요.
          </p>
        </div>

        {/* Cards */}
        <div
          data-reveal
          data-delay="200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {pressItems.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="press-card"
            >
              {/* Card top: type + date */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <TypeBadge type={item.type} />
                <span style={{ fontSize: 13, color: "#9FA3A8" }}>{item.date}</span>
              </div>

              {/* Title */}
              <div
                className="press-card-title"
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1F1F22",
                  lineHeight: 1.4,
                  letterSpacing: "-0.3px",
                  marginBottom: 12,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </div>

              {/* Desc */}
              {item.desc && (
                <div
                  style={{
                    fontSize: 14,
                    color: "#707378",
                    lineHeight: 1.7,
                    marginBottom: 24,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.desc}
                </div>
              )}

              {/* Footer: source + arrow */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                  paddingTop: 20,
                  borderTop: "1px solid #E8EAED",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#9FA3A8" }}>
                  {item.source}
                </span>
                <span className="press-card-arrow" style={{ color: "#347BF6", display: "flex", alignItems: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .press-card {
          background: #fff;
          border-radius: 24px;
          padding: 32px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          border: 1px solid #E8EAED;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .press-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          border-color: #347BF6;
        }
        .press-card:hover .press-card-title {
          color: #347BF6;
        }
        .press-card:hover .press-card-arrow {
          transform: translateX(3px);
          transition: transform 0.2s ease;
        }
      `}</style>
    </section>
  );
}
