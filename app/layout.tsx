import type { Metadata } from "next";
import "./globals.css";

const description = "북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "한입 링크", template: "%s | 한입 링크" },
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "한입 링크",
    title: "한입 링크",
    description,
    images: [{ url: "/thumbnail.png", alt: "한입 링크" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "한입 링크",
    description,
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
