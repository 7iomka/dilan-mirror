import { useTranslation } from 'react-i18next';
import { BaseLayout } from '@/widgets/layouts/base-layout';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { currentRoute } from './home.model';

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout route={currentRoute}>
      <div className="container">
        <h2>{t('hero.title')}</h2>
        <div className="mt-4">
          <Button className="w-200 box-content">Hellow</Button>
          <Icon name="instagram" />
        </div>
      </div>
    </BaseLayout>
  );
};
