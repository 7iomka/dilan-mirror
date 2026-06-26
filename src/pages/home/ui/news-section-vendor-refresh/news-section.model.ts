import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { Fancybox } from '@fancyapps/ui';
import { fallbackLanguageCode, type SupportedLanguageCode } from '@/shared/config/i18n-config';
import { routes } from '@/shared/routing';
import { $$i18n } from '@/shared/i18n';
import { appConfig } from '@/shared/config/app-config';
import { getDynamicTail } from '@/shared/lib/formatting';
import type {
  GetNewsItemDetailsRequestParams,
  GetNewsRequestParams,
  NewsDetailDto,
  NewsListResponseDto,
} from './news-section.types';
import type { NewsDetailNormalized, NewsListItemNormalized } from './news-section.lib';
import {
  DEFAULT_NEWS_SECTION_QUERY,
  NEWS_ITEM_MODAL_ID,
  normalizeNewsDetail,
  normalizeNewsListItem,
  resolveCategorySlug,
} from './news-section.lib';

export const currentRoute = routes.home;

const buildListUrl = (params: GetNewsRequestParams) => {
  const url = new URL(`${appConfig.apiNewsBaseURL}/api/news`);
  url.searchParams.set('lang', params.lang);
  url.searchParams.set('page', String(params.page));
  url.searchParams.set('size', String(params.size));
  url.searchParams.set('sort', params.sort ?? 'publishedAt,desc');
  url.searchParams.set('ts', getDynamicTail());

  if (params.q) {
    url.searchParams.set('q', params.q);
  }

  const categorySlug = resolveCategorySlug(params.categorySlugs);
  if (categorySlug) {
    url.searchParams.set('slug', categorySlug);
  }

  if (params.categorySlugs && params.categorySlugs.length > 0) {
    url.searchParams.set('slugs', params.categorySlugs.join(','));
  }

  return url.toString();
};

const getFx = createEffect<GetNewsRequestParams, NewsListResponseDto>({
  handler: async (params) => {
    const res = await fetch(buildListUrl(params));
    const json = await res.json();

    return json;
  },
});

const $items = createStore<NewsListItemNormalized[]>([]);
const $isItemsDirty = createStore(false).on(getFx.finally, () => true);
const $isItemsLoading = combine(
  getFx.pending,
  $isItemsDirty,
  (isPending, isDirty) => isPending || !isDirty,
);

sample({
  clock: getFx.doneData,
  fn: ({ items }) => items.map(normalizeNewsListItem),
  target: $items,
});

const mapDto = (lang?: SupportedLanguageCode): GetNewsRequestParams => ({
  ...DEFAULT_NEWS_SECTION_QUERY,
  lang: lang || ($$i18n.i18n.language as SupportedLanguageCode) || fallbackLanguageCode,
});

sample({
  clock: currentRoute.opened,
  fn: ({ params }) => mapDto('lang' in params ? (params.lang as SupportedLanguageCode) : undefined),
  target: getFx,
});

sample({
  clock: $$i18n.languageChanged,
  fn: mapDto,
  target: getFx,
});

const getItemDetailsFx = createEffect<GetNewsItemDetailsRequestParams, NewsDetailDto>({
  handler: async ({ slug, lang }) => {
    const url = new URL(`${appConfig.apiNewsBaseURL}/api/news-detail`);
    url.searchParams.set('slug', slug);
    url.searchParams.set('lang', lang);

    const res = await fetch(url.toString());
    const json = await res.json();

    return json;
  },
});

const $itemDetails = createStore<NewsDetailNormalized | null>(null);
const $isItemDetailsDirty = createStore(false).on(getItemDetailsFx.finally, () => true);
const $isItemDetailsLoading = combine(
  getItemDetailsFx.pending,
  $isItemDetailsDirty,
  (isPending, isDirty) => isPending || !isDirty,
);

const openDetailsTriggered = createEvent<string>();

sample({
  clock: getItemDetailsFx.doneData,
  fn: normalizeNewsDetail,
  target: $itemDetails,
});

sample({
  clock: openDetailsTriggered,
  source: $$i18n.$language,
  fn: (lang, slug) => ({ slug, lang }),
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
