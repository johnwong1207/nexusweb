export type PricingTier = {
  id: string;
  nameEn: string;
  nameZh: string;
  priceEn: string;
  priceZh: string;
  unitEn: string;
  unitZh: string;
  taglineEn: string;
  taglineZh: string;
  featuresEn: string[];
  featuresZh: string[];
  ctaEn: string;
  ctaZh: string;
  href: string;
  highlighted?: boolean;
  badgeEn?: string;
  badgeZh?: string;
};

export type PricingCategory = "students" | "families" | "schools";

export const pricingConfig: Record<PricingCategory, PricingTier[]> = {
  students: [
    {
      id: "student-basic",
      nameEn: "Student Basic",
      nameZh: "學生基礎版",
      priceEn: "HK$68",
      priceZh: "HK$68",
      unitEn: "/ month",
      unitZh: "/ 月",
      taglineEn: "Everyday homework companion.",
      taglineZh: "每日功課好夥伴。",
      featuresEn: ["AI Tutor", "Homework support", "Quiz", "Basic learning progress"],
      featuresZh: ["AI 導師", "功課支援", "測驗", "基礎學習進度"],
      ctaEn: "Start Student Plan",
      ctaZh: "開始學生計劃",
      href: "/student/signup",
    },
    {
      id: "student-pro",
      nameEn: "Student Pro",
      nameZh: "學生專業版",
      priceEn: "HK$128",
      priceZh: "HK$128",
      unitEn: "/ month",
      unitZh: "/ 月",
      taglineEn: "Full personalised learning loop.",
      taglineZh: "完整個人化學習閉環。",
      featuresEn: [
        "Personalised learning",
        "Adaptive practice",
        "Language Coach",
        "STEM / Virtual FAB",
        "Advanced progress",
      ],
      featuresZh: ["個人化學習", "自適應練習", "Language Coach", "STEM / 虛擬晶圓廠", "進階學習進度"],
      ctaEn: "Start Student Plan",
      ctaZh: "開始學生計劃",
      href: "/student/signup",
      highlighted: true,
      badgeEn: "Most popular",
      badgeZh: "最受歡迎",
    },
  ],
  families: [
    {
      id: "family",
      nameEn: "Family",
      nameZh: "家庭版",
      priceEn: "HK$198",
      priceZh: "HK$198",
      unitEn: "/ month",
      unitZh: "/ 月",
      taglineEn: "Up to 3 children, one calm dashboard.",
      taglineZh: "最多 3 位子女，一個清晰家長儀表板。",
      featuresEn: [
        "Up to 3 children",
        "Student Pro features",
        "Parent dashboard",
        "Family profiles",
        "Learning reports",
      ],
      featuresZh: ["最多 3 位子女", "學生專業版功能", "家長儀表板", "家庭檔案", "學習報告"],
      ctaEn: "Start Family Plan",
      ctaZh: "開始家庭計劃",
      href: "/family/signup",
      highlighted: true,
      badgeEn: "Most popular",
      badgeZh: "最受歡迎",
    },
  ],
  schools: [
    {
      id: "school-starter",
      nameEn: "School Starter",
      nameZh: "學校入門版",
      priceEn: "Contact us",
      priceZh: "聯絡我們",
      unitEn: "",
      unitZh: "",
      taglineEn: "Start with Copilot + classroom essentials.",
      taglineZh: "由 Copilot 及課堂基礎開始。",
      featuresEn: ["Teacher AI Copilot", "NEXUS Classroom", "Smart notices", "Onboarding support"],
      featuresZh: ["教師 AI Copilot", "NEXUS Classroom", "智能通告", "入門支援"],
      ctaEn: "Book a School Demo",
      ctaZh: "預約學校示範",
      href: "/schools/contact",
    },
    {
      id: "school-transformation",
      nameEn: "School Transformation",
      nameZh: "學校轉型版",
      priceEn: "From HK$98,000",
      priceZh: "由 HK$98,000 起",
      unitEn: "/ year",
      unitZh: "/ 年",
      taglineEn: "Whole-school AI implementation.",
      taglineZh: "全校 AI 落實方案。",
      featuresEn: [
        "Everything in Starter",
        "AI assessment + analytics",
        "STEAM Lab / Virtual FAB",
        "Teacher workshops",
        "Implementation tracking",
      ],
      featuresZh: ["入門版全部功能", "AI 評核 + 數據分析", "STEAM Lab / 虛擬晶圓廠", "教師工作坊", "落實追蹤"],
      ctaEn: "Book a School Demo",
      ctaZh: "預約學校示範",
      href: "/schools/contact",
      highlighted: true,
      badgeEn: "Most popular",
      badgeZh: "最受歡迎",
    },
    {
      id: "school-private",
      nameEn: "Advanced / Private AI",
      nameZh: "進階 / 私有 AI",
      priceEn: "Custom quotation",
      priceZh: "按需報價",
      unitEn: "",
      unitZh: "",
      taglineEn: "Local LLM, private RAG, private cloud.",
      taglineZh: "本地 LLM、私有 RAG、私有雲。",
      featuresEn: ["Local LLM option", "Private database", "Private RAG + Model Router", "Audit + retention controls"],
      featuresZh: ["本地 LLM 選項", "私有數據庫", "私有 RAG + 模型路由器", "審計 + 保留控制"],
      ctaEn: "Book a School Demo",
      ctaZh: "預約學校示範",
      href: "/schools/contact",
    },
  ],
};
