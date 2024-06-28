import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { Fancybox } from '@fancyapps/ui';
import { fallbackLanguageCode, type SupportedLanguageCode } from '@/shared/config/i18n-config';
import { routes } from '@/shared/routing';
import { $$i18n } from '@/shared/i18n';
import { appConfig } from '@/shared/config/app-config';
import type {
  GetNewsItemDetailsRequestParams,
  GetNewsRequestParams,
  NewsDto,
  NewsItemDetailsDto,
} from './news-section.types';
import type { NewsItemNormalized } from './news-section.lib';
import { getDynamicTail, NEWS_ITEM_MODAL_ID, normalizeNewsItem } from './news-section.lib';

export const currentRoute = routes.home;

const getFx = createEffect<GetNewsRequestParams, NewsDto>({
  handler: async ({ language, limit, page }) => {
    const res = await fetch(
      `${
        appConfig.apiBaseURL
      }/application/news?limit=${limit}&page=${page}&language=${language}&ts=${getDynamicTail()}`,
    );
    const json = await res.json();

    return json;
  },
});

const $items = createStore<NewsItemNormalized[]>([]);
const $isItemsDirty = createStore(false).on(getFx.finally, () => true);
const $isItemsLoading = combine(
  getFx.pending,
  $isItemsDirty,
  (isPending, isDirty) => isPending || !isDirty,
);

sample({
  clock: getFx.doneData,
  fn: ({ data }) => data.items.map(normalizeNewsItem),
  target: $items,
});

const mapDto = (lang?: SupportedLanguageCode) => {
  const language = lang || ($$i18n.i18n.language as SupportedLanguageCode) || fallbackLanguageCode;

  return {
    language,
    limit: 20,
    page: 1,
  };
};

sample({
  clock: currentRoute.opened,
  fn: ({ params }) => {
    return mapDto('lang' in params ? (params.lang as SupportedLanguageCode) : undefined);
  },
  target: getFx,
});

sample({
  clock: $$i18n.languageChanged,
  fn: mapDto,
  target: getFx,
});

const getItemDetailsFx = createEffect<GetNewsItemDetailsRequestParams, NewsItemDetailsDto>({
  handler: async ({ id, language }) => {
    const res = await fetch(`${appConfig.apiBaseURL}/application/news/${id}?language=${language}`);
    const json = await res.json();

    return json;
  },
});

const $itemDetails = createStore<NewsItemNormalized | null>(null);
const $isItemDetailsDirty = createStore(false).on(getItemDetailsFx.finally, () => true);
const $isItemDetailsLoading = combine(
  getItemDetailsFx.pending,
  $isItemDetailsDirty,
  (isPending, isDirty) => isPending || !isDirty,
);

const openDetailsTriggered = createEvent<string | number>();

sample({
  clock: getItemDetailsFx.doneData,
  fn: ({ data }) => normalizeNewsItem(data),
  target: $itemDetails,
});

sample({
  clock: openDetailsTriggered,
  source: $$i18n.$language,
  fn: (language, id) => ({ id, language }),
  target: getItemDetailsFx,
});

sample({
  clock: openDetailsTriggered,
  target: createEffect(() => {
    Fancybox.show([
      {
        src: `#${NEWS_ITEM_MODAL_ID}`,
        type: 'inline',
      },
    ]);
  }),
});

export const $$newsSection = {
  $items,
  $isItemsLoading,
  $isItemsDirty,
  openDetailsTriggered,
  $itemDetails,
  $isItemDetailsLoading,
};
