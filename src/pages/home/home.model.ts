import { debug } from 'patronum/debug';
import { routes } from '@/shared/routing';

export const currentRoute = routes.home;

debug({
  currentRouteParams: currentRoute.$params,
});
