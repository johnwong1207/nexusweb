import type { Metadata } from "next";
import { Inter, Noto_Sans_HK } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const notoHK = Noto_Sans_HK({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-noto" });

export const metadata: Metadata = {
  title: {
    default: "NEXUS Learn | AI Learning Platform for Schools, Students & Families",
    template: "%s | NEXUS Learn",
  },
  description:
    "One AI learning platform for schools, students and families. Personalised learning, teacher AI tools, assessment, STEM education, school analytics and family communication in one secure platform. 為學校、學生及家庭而設的一站式 AI 教育平台。",
  keywords: ["NEXUS Learn", "AI education", "personalised learning", "teacher copilot", "STEM", "virtual fab", "家校通訊", "AI 教育平台"],
  authors: [{ name: "NEXUS Learn" }],
  openGraph: {
    type: "website",
    siteName: "NEXUS Learn",
    title: "NEXUS Learn | AI Learning Platform for Schools, Students & Families",
    description:
      "AI that understands how every student learns. 為學校、學生及家庭而設的一站式 AI 教育平台。",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS Learn | AI Learning Platform for Schools, Students & Families",
    description: "One AI learning platform for schools, students and families.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://nexus-learn.example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoHK.variable} font-sans bg-[#050B1E] text-slate-200`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-900"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
