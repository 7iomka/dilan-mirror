import { Link } from 'atomic-router-react/scope';
import { useTranslation } from 'react-i18next';
import { BaseLayout } from '@/widgets/layouts/base-layout';
import { routes } from '@/shared/routing';
import { currentRoute } from './not-found.model';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <BaseLayout route={currentRoute}>
      <div className="container">
        <h1>{t('errors.pageNotFound')}</h1>
        <p>{t('errors.notFoundDescription')}</p>
        {/* <Link to={routes.home}>{t('errors.goBackHome')}</Link> */}
      </div>
    </BaseLayout>
  );
};
