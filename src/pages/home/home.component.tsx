import { BaseLayout } from '@/widgets/layouts/base-layout';
import { HeroSection, IndicatorsSection, ExamplesSection, HowItWorksSection } from './ui';

export const HomePage = () => {
  return (
    <BaseLayout withStickyHeader>
      <HeroSection />
      <IndicatorsSection />
      <ExamplesSection />
      <HowItWorksSection />
    </BaseLayout>
  );
};
