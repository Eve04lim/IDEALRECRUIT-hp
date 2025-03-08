// src/app/page.tsx

import { AboutSection } from '@/components/AboutSection';
import { AchievementSection } from '@/components/AchievementSection';
import { CasesSection } from '@/components/CasesSection';
import { ContactSection } from '@/components/ContactSection';
import { FAQSection } from '@/components/FAQSection';
import { FlowSection } from '@/components/FlowSection';
import { Hero } from '@/components/Hero';
import { NewsSection } from '@/components/NewsSection';
import { ServiceSection } from '@/components/ServiceSection';
import { VisionSection } from '@/components/VisionSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <VisionSection />
      <ServiceSection />
      <AchievementSection />
      <FlowSection />
      <CasesSection />
      <NewsSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}