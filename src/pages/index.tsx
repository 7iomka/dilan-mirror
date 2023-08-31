import { Route } from 'atomic-router-react';
import { lazy } from 'react';
import { Loadable } from '@/shared/ui/loadable';
import { routes } from '@/shared/routing';
import HomePage from './home';

// const HomePage = Loadable(lazy(() => import('./home')));
// const Page404 = Loadable(lazy(() => import('@/pages/page-404')));

export const Pages = () => <Route route={routes.home} view={HomePage} />;
