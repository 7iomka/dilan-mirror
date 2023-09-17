import { BaseLayout } from '@/widgets/layouts/base-layout';
import {
  HeroSection,
  IndicatorsSection,
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
      {/* <HeroSection /> */}
      <IndicatorsSection />
      <ExamplesSection />
      <HowItWorksSection />
      <ArgumentsSection />
      <RoadmapSection />
      <AuthorshipSection />
      <InvestSection />
    </BaseLayout>
  );
};
