import { createRoutesView } from 'atomic-router-react';
import { routes } from '@/shared/routing';
import { HomePage } from './home';
import { NotFoundPage } from './not-found';

export const Pages = createRoutesView({
  routes: [{ route: routes.home, view: HomePage }],
  otherwise: NotFoundPage,
});
