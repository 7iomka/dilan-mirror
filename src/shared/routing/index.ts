import { createHistoryRouter, createRoute } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { sample } from 'effector';
import { appStarted } from '@/shared/config/events';

export const routes = {
  home: createRoute(),
};

export const notFoundRoute = createRoute();

export const routesMap = [{ path: '/', route: routes.home }];

export const router = createHistoryRouter({
  base: '/:lang?',
  routes: routesMap,
  notFoundRoute,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
