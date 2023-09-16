import { BaseLayout } from '@/widgets/layouts/base-layout';
import {
  HeroSection,
  IndicatorsSection,
  ExamplesSection,
  HowItWorksSection,
  ArgumentsSection,
  AuthorshipSection,
} from './ui';
import { RoadmapSection } from './ui/roadmap-section';

export const HomePage = () => {
  return (
    <BaseLayout withStickyHeader>
      <HeroSection />
      <IndicatorsSection />
      <ExamplesSection />
      <HowItWorksSection />
      <ArgumentsSection />
      <RoadmapSection />
      <AuthorshipSection />
    </BaseLayout>
  );
};
