// src/app/page.tsx

import { AchievementSection } from '@/components/AchievementSection';
import { CasesSection } from '@/components/CasesSection';
import { ContactSection } from '@/components/ContactSection';
import { FlowSection } from '@/components/FlowSection';
import { Hero } from '@/components/Hero';
import { ServiceSection } from '@/components/ServiceSection';
import { VisionSection } from '@/components/VisionSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServiceSection />
      <AchievementSection />
      <CasesSection />
      <FlowSection />
      <VisionSection /> {/* 企業理念を含む簡略化したセクション */}
      <ContactSection />
    </main>
  );
}
