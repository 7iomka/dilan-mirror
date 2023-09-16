import { BaseLayout } from '@/widgets/layouts/base-layout';
import {
  // HeroSection,
  IndicatorsSection,
  ExamplesSection,
  // HowItWorksSection,
  ArgumentsSection,
} from './ui';

export const HomePage = () => {
  return (
    <BaseLayout withStickyHeader>
      {/* <HeroSection /> */}
      <IndicatorsSection />
      <ExamplesSection />
      {/* <HowItWorksSection /> */}
      <ArgumentsSection />
    </BaseLayout>
  );
};
