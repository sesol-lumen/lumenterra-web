import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { company, name, email, phone, message } = await req.json();

  if (!company || !name || !email) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  const html = `
    <h2>제휴 문의가 접수되었습니다</h2>
    <table style="border-collapse:collapse;width:100%;">
      <tr><td style="padding:8px;font-weight:bold;color:#555;">기업명</td><td style="padding:8px;">${company}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555;">담당자명</td><td style="padding:8px;">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555;">담당자 이메일</td><td style="padding:8px;">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555;">담당자 연락처</td><td style="padding:8px;">${phone || "-"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555;vertical-align:top;">문의 내용</td><td style="padding:8px;">${message ? message.replace(/\n/g, "<br>") : "-"}</td></tr>
    </table>
  `;

  try {
    await resend.emails.send({
      from: "루멘테라 홈페이지 <onboarding@resend.dev>",
      to: ["contact@platpharm.co.kr", "ksk2023@platpharm.co.kr"],
      replyTo: email,
      subject: `[제휴 문의] ${company} - ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return NextResponse.json({ error: "이메일 전송 실패" }, { status: 500 });
  }
}
