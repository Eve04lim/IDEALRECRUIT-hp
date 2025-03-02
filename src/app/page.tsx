// src/app/page.tsx

import { Hero } from '@/components/Hero';
import { MessageSection } from '@/components/MessageSection';
import { VisionSection } from '@/components/VisionSection';
import { ServiceSection } from '@/components/ServiceSection';
import { FlowSection } from '@/components/FlowSection';
import { CasesSection } from '@/components/CasesSection';
import { AboutSection } from '@/components/AboutSection';
import { FAQSection } from '@/components/FAQSection';
import { NewsSection } from '@/components/NewsSection';
import { AchievementSection } from '@/components/AchievementSection';
import { ContactSection } from '@/components/ContactSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MessageSection />
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