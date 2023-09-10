import type { HistoryPushParams } from 'atomic-router';
import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';
import { fallbackLanguageCode } from '../config/i18n-config';

export const controls = createRouterControls();

export const routes = {
  home: createRoute(),
};

export const notFoundRoute = createRoute();

export const routesMap = [{ path: '/', route: routes.home }];

export const router = createHistoryRouter({
  base: '/:lang?',
  routes: routesMap,
  notFoundRoute,
  controls,
});

const history = createBrowserHistory();

// Add trailing slash if not present
sample({
  clock: router.$path,
  source: { query: router.$query },
  filter: (_, path) => !path.endsWith('/'),
  fn: ({ query }, path): Omit<HistoryPushParams, 'history'> => ({
    path: `${path}/`,
    query,
    params: {},
    method: 'replace',
  }),
  target: router.push,
});

// Remove duplicate routes with fallback language in path
sample({
  clock: router.$path,
  source: { query: router.$query },
  filter: (_, path) => !path.startsWith(`${fallbackLanguageCode}/`),
  fn: ({ query }, path): Omit<HistoryPushParams, 'history'> => ({
    path: path.replace(`${fallbackLanguageCode}/`, ''),
    query,
    params: {},
    method: 'replace',
  }),
  target: router.push,
});

// Set history
router.setHistory(history);

// sample({
//   clock: appStarted,
//   fn: () => history,
//   target: router.setHistory,
// });
