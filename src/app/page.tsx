"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { ProductLoop } from "@/components/ProductLoop";
import { SchoolBenefits } from "@/components/sections/SchoolBenefits";
import { StudentLearning } from "@/components/sections/StudentLearning";
import { FamilyDashboard } from "@/components/sections/FamilyDashboard";
import { TeacherCopilot } from "@/components/sections/TeacherCopilot";
import { Assessment } from "@/components/sections/Assessment";
import { VirtualFab } from "@/components/sections/VirtualFab";
import { PhysicalComputing } from "@/components/sections/PhysicalComputing";
import { StemCampus } from "@/components/sections/StemCampus";
import { LanguageCoachSection, ClassroomSection } from "@/components/LanguageClassroom";
import { Communication } from "@/components/sections/Communication";
import { Intelligence } from "@/components/sections/Intelligence";
import { Security } from "@/components/sections/Security";
import { TransformationSection } from "@/components/SecurityTransformation";
import { Pricing } from "@/components/Pricing";
import { DemoVideo, SocialProof } from "@/components/DemoProof";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Audience />
        <ProductLoop />
        <SchoolBenefits />
        <StudentLearning />
        <FamilyDashboard />
        <TeacherCopilot />
        <Assessment />
        <VirtualFab />
        <PhysicalComputing />
        <StemCampus />
        <LanguageCoachSection />
        <ClassroomSection />
        <Communication />
        <Intelligence />
        <Security />
        <TransformationSection />
        <Pricing />
        <DemoVideo />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
