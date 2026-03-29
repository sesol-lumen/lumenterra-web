"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#29303D", padding: "64px 0 40px" }}>
      <div className="container-main">

        {/* Brand + Business Info */}
        <div
          style={{
            marginBottom: 40,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: "#fff",
              letterSpacing: "-0.5px",
              marginBottom: 20,
            }}
          >
            LUMENTERRA
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.8 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 6 }}>대표이사</span>노형곤
              <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.2)" }}>•</span>
              <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 6 }}>개인정보책임관리자</span>김상균
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.8 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 6 }}>사업자등록번호</span>350-87-03086
              <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.2)" }}>•</span>
              <a
                href="https://www.bizno.net/article/3508703086"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}
              >
                사업자정보확인
              </a>
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.8 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 6 }}>법인명</span>주식회사 루멘테라
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.8 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 6 }}>주소</span>전라북도 전주시 덕진구 안덕원로 51, 3층 329호
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.8 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 6 }}>이메일</span>
              <a
                href="mailto:contact@platpharm.co.kr"
                style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
              >
                contact@platpharm.co.kr
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", margin: 0 }}>
            © 2023 (주)루멘테라. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["개인정보처리방침", "이용약관"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "rgba(255,255,255,0.25)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
