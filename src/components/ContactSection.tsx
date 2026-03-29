"use client";

import { useEffect, useRef, useState } from "react";

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ESC 키로 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.company.trim()) errs.company = "기업명을 입력해주세요.";
    if (!form.name.trim()) errs.name = "담당자명을 입력해주세요.";
    if (!form.email.trim()) errs.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "올바른 이메일 형식이 아닙니다.";
    if (form.message.length > 1000) errs.message = "1,000자 이내로 입력해주세요.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSendError("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    background: "#F7F8FA",
    border: `1.5px solid ${hasError ? "#EF4444" : "#E8EAED"}`,
    borderRadius: 12,
    padding: "14px 18px",
    fontSize: 15,
    color: "#1F1F22",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 28,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "48px 44px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          animation: "modalIn 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#F0F1F2",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#E8EAED"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F0F1F2"; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#707378" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: "#1F1F22", letterSpacing: "-0.5px", margin: 0 }}>
                제휴 문의
              </h3>
              <p style={{ fontSize: 14, color: "#9FA3A8", marginTop: 8, lineHeight: 1.6 }}>
                문의 내용을 남겨주시면 담당자가 빠르게 연락드립니다.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
                {/* 기업명 */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#1F1F22", display: "block", marginBottom: 8 }}>
                    기업명 <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="회사명을 입력해주세요"
                    value={form.company}
                    onChange={(e) => { setForm({ ...form, company: e.target.value }); setErrors({ ...errors, company: "" }); }}
                    style={inputStyle(!!errors.company)}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.company ? "#EF4444" : "#347BF6"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.company ? "#EF4444" : "#E8EAED"; }}
                  />
                  {errors.company && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 6 }}>{errors.company}</p>}
                </div>

                {/* 담당자명 */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#1F1F22", display: "block", marginBottom: 8 }}>
                    담당자명 <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="담당자 이름을 입력해주세요"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    style={inputStyle(!!errors.name)}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.name ? "#EF4444" : "#347BF6"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.name ? "#EF4444" : "#E8EAED"; }}
                  />
                  {errors.name && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 6 }}>{errors.name}</p>}
                </div>

                {/* 담당자 이메일 */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#1F1F22", display: "block", marginBottom: 8 }}>
                    담당자 이메일 <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@company.com"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    style={inputStyle(!!errors.email)}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.email ? "#EF4444" : "#347BF6"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = errors.email ? "#EF4444" : "#E8EAED"; }}
                  />
                  {errors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 6 }}>{errors.email}</p>}
                </div>

                {/* 담당자 연락처 */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#1F1F22", display: "block", marginBottom: 8 }}>
                    담당자 연락처 <span style={{ fontSize: 12, fontWeight: 400, color: "#9FA3A8" }}>(선택)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); }}
                    style={inputStyle(false)}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#347BF6"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#E8EAED"; }}
                  />
                </div>

                {/* 문의 내용 */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#1F1F22", display: "block", marginBottom: 8 }}>
                    문의 내용 <span style={{ fontSize: 12, fontWeight: 400, color: "#9FA3A8" }}>(선택)</span>
                  </label>
                  <textarea
                    placeholder="문의 내용을 입력해주세요. (1,000자 이내)"
                    value={form.message}
                    maxLength={1000}
                    rows={5}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    style={{
                      ...inputStyle(!!errors.message),
                      resize: "vertical",
                      minHeight: 120,
                    }}
                    onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = errors.message ? "#EF4444" : "#347BF6"; }}
                    onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = errors.message ? "#EF4444" : "#E8EAED"; }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    {errors.message
                      ? <p style={{ fontSize: 12, color: "#EF4444", margin: 0 }}>{errors.message}</p>
                      : <span />
                    }
                    <span style={{ fontSize: 12, color: form.message.length >= 900 ? "#EF4444" : "#9FA3A8" }}>
                      {form.message.length} / 1,000
                    </span>
                  </div>
                </div>
              </div>

              {sendError && (
                <p style={{ fontSize: 13, color: "#EF4444", marginBottom: 12, textAlign: "center" }}>
                  {sendError}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                style={{
                  width: "100%",
                  background: sending ? "#9FC3FB" : "#347BF6",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "15px",
                  borderRadius: 50,
                  border: "none",
                  cursor: sending ? "not-allowed" : "pointer",
                  letterSpacing: "-0.3px",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.background = "#1a5fd4"; }}
                onMouseLeave={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.background = "#347BF6"; }}
              >
                {sending ? "전송 중..." : "문의 보내기"}
              </button>
            </form>
          </>
        ) : (
          /* 제출 완료 */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(52,123,246,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14l7 7L23 7" stroke="#347BF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "#1F1F22", letterSpacing: "-0.5px", marginBottom: 12 }}>
              문의가 접수되었습니다
            </h3>
            <p style={{ fontSize: 15, color: "#707378", lineHeight: 1.7, marginBottom: 36 }}>
              빠른 시일 내에 담당자가<br />연락드리겠습니다.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "#F0F1F2",
                color: "#1F1F22",
                fontWeight: 700,
                fontSize: 15,
                padding: "13px 32px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#E8EAED"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F0F1F2"; }}
            >
              닫기
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function ContactSection() {
  const ref = useScrollReveal() as React.RefObject<HTMLElement>;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ background: "#000", padding: "120px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Background effects */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 20% 50%, rgba(52,123,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(124,92,246,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative" }}>
        {/* Label */}
        <div data-reveal data-delay="0" style={{ marginBottom: 16, textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "3px", textTransform: "uppercase" }}>
            Contact
          </span>
        </div>

        {/* Heading */}
        <div data-reveal data-delay="100" style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 64px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-2px", marginBottom: 20 }}>
            함께 시작할
            <br />
            준비가 되셨나요?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            플랫팜·약콕 도입 문의, 파트너십 제안, 서비스 상담을 환영합니다.
          </p>
        </div>

        {/* Single Contact Card */}
        <div data-reveal data-delay="200" style={{ maxWidth: 560, margin: "0 auto 48px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 32,
              padding: "52px 56px",
              backdropFilter: "blur(20px)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 14 }}>
              제휴 문의
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 40 }}>
              문의 내용을 남겨주시면 담당자가 빠르게 연락드립니다.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#347BF6",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                padding: "15px 36px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                letterSpacing: "-0.3px",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1a5fd4";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#347BF6";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              제휴 문의하기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom tagline */}
        <div data-reveal data-delay="300" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.25)", letterSpacing: "0.5px" }}>
            (주)루멘테라 · 헬스케어 유통의 디지털 혁신
          </p>
        </div>
      </div>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
