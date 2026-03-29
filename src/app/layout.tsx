import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "(주)루멘테라 | 헬스케어 유통의 디지털 혁신",
  description:
    "루멘테라는 플랫팜과 약콕을 통해 헬스케어 유통 생태계를 디지털로 혁신합니다. B2B 의약품 거래 플랫폼 플랫팜, 약국 O2O 앱 약콕.",
  keywords: ["루멘테라", "플랫팜", "약콕", "의약품 플랫폼", "약국 O2O"],
  openGraph: {
    title: "(주)루멘테라 | 헬스케어 유통의 디지털 혁신",
    description:
      "플랫팜과 약콕으로 헬스케어 유통 생태계를 혁신합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
