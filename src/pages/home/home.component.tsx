import { useTranslation } from 'react-i18next';
import { BaseLayout } from '@/widgets/layouts/base-layout';
import { Button } from '@/shared/ui/button';

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout>
      <div className="container">
        <h2>{t('hero.title')}</h2>
        <div className="mt-4">
          <Button className="w-200">Hellow</Button>
        </div>
      </div>
    </BaseLayout>
  );
};
