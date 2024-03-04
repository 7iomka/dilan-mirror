import { BaseLayout } from '@/widgets/layouts/base-layout';
import {
  HeroSection,
  IntroSection,
  ExamplesSection,
  HowItWorksSection,
  ArgumentsSection,
  AuthorshipSection,
  RoadmapSection,
  NewsSection,
  InvestSection,
} from './ui';
import { PatentsSection } from './ui/patents-section';

export const HomePage = () => {
  return (
    <BaseLayout withStickyHeader>
      <HeroSection />
      <IntroSection />
      <ExamplesSection />
      <HowItWorksSection />
      <ArgumentsSection />
      <RoadmapSection />
      <NewsSection />
      <AuthorshipSection />
      <PatentsSection />
      <InvestSection />
    </BaseLayout>
  );
};
