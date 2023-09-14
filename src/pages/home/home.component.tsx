import { useTranslation } from 'react-i18next';
import { BaseLayout } from '@/widgets/layouts/base-layout';
import { HeroSection, IndicatorsSection, ExamplesSection } from './ui';

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout withStickyHeader>
      <HeroSection />
      <IndicatorsSection />
      <ExamplesSection />
    </BaseLayout>
  );
};
