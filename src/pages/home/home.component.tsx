import { useTranslation } from 'react-i18next';
import { BaseLayout } from '@/widgets/layouts/base-layout';

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout>
      <div className="container">
        <h2>{t('hero.title')}</h2>
        <div className="mt-4">Demo</div>
      </div>
    </BaseLayout>
  );
};
