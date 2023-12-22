import { BaseLayout } from '@/widgets/layouts/base-layout';
import {
  HeroSection,
  IntroSection,
  ExamplesSection,
  HowItWorksSection,
  ArgumentsSection,
  AuthorshipSection,
  RoadmapSection,
  InvestSection,
} from './ui';

export const HomePage = () => {
  return (
    <BaseLayout withStickyHeader>
      <HeroSection />
      <IntroSection />
      <ExamplesSection />
      <HowItWorksSection />
      <ArgumentsSection />
      <RoadmapSection />
      <AuthorshipSection />
      <InvestSection />
    </BaseLayout>
  );
};
