import xss from 'xss';
import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { fallbackLanguageCode, type SupportedLanguageCode } from '@/shared/config/i18n-config';
import { routes } from '@/shared/routing';
import { $$i18n } from '@/shared/i18n';
import type { GetNewsRequestParams, NewsDto } from './news-section.types';
import type { NewsItemNormalized } from './news-section.lib';
import { normalizeNewsItem } from './news-section.lib';

export const currentRoute = routes.home;

const opened = createEvent();
const getFx = createEffect<GetNewsRequestParams, NewsDto>({
  handler: async ({ language, limit, page }) => {
    try {
      // const res = await fetch(
      //   `https://api.dilan-mirror.com/application/news?limit=${limit}&page=${page}&language=${language}`,
      // );
      // const json = await res.json();

      const mockItem = {
        id: 1,
        attachments: [],
        shortDescription: [
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'en',
          },
          {
            content:
              'Краудфайтинга по проекту ,,Dilan Mirror’’ прошел успешно, были привлечены первые инвесторы. Официальный запуск запланирован на январь, но возможность для инвестиций открыты уже сейчас.',
            language: 'ru',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'hi',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'vi',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'fr',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'ar',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'es',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'ko',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'ja',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'bn',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'cn',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'pt',
          },
          {
            content:
              'Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.',
            language: 'id',
          },
        ],
        title: [
          {
            content: 'Pre-start',
            language: 'en',
          },
          {
            content: 'Предварительный запуск',
            language: 'ru',
          },
          {
            content: 'Pre-start',
            language: 'hi',
          },
          {
            content: 'Pre-start',
            language: 'vi',
          },
          {
            content: 'Pre-start',
            language: 'fr',
          },
          {
            content: 'Pre-start',
            language: 'ar',
          },
          {
            content: 'Pre-start',
            language: 'es',
          },
          {
            content: 'Pre-start',
            language: 'ko',
          },
          {
            content: 'Pre-start',
            language: 'ja',
          },
          {
            content: 'Pre-start',
            language: 'bn',
          },
          {
            content: 'Pre-start',
            language: 'cn',
          },
          {
            content: 'Pre-start',
            language: 'pt',
          },
          {
            content: 'Pre-start',
            language: 'id',
          },
        ],
        header: [
          {
            content: null,
            language: 'en',
          },
          {
            content: null,
            language: 'ru',
          },
          {
            content: null,
            language: 'hi',
          },
          {
            content: null,
            language: 'vi',
          },
          {
            content: null,
            language: 'fr',
          },
          {
            content: null,
            language: 'ar',
          },
          {
            content: null,
            language: 'es',
          },
          {
            content: null,
            language: 'ko',
          },
          {
            content: null,
            language: 'ja',
          },
          {
            content: null,
            language: 'bn',
          },
          {
            content: null,
            language: 'cn',
          },
          {
            content: null,
            language: 'pt',
          },
          {
            content: null,
            language: 'id',
          },
        ],
        content: [
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'en',
          },
          {
            content:
              '<p>Краудфайтинга по проекту ,,Dilan Mirror’’ прошел успешно, были привлечены первые инвесторы. Официальный запуск запланирован на январь, но возможность для инвестиций открыты уже сейчас.</p>',
            language: 'ru',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'hi',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'vi',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'fr',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'ar',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'es',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'ko',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'ja',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'bn',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'cn',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'pt',
          },
          {
            content:
              '<p>Crowdfighting for the Dilan Mirror project was successful, and the first investors were attracted. The official launch is scheduled for January, but investment opportunities are open now.</p>',
            language: 'id',
          },
        ],
        influencedProjectIds: [1],
        isActive: true,
        isSharePriceChanged: false,
        isUserLikedIt: null,
        likesCount: 7,
        viewsCount: 31,
        metadata: {
          mainImg:
            'https://dev-tiaglin-cdn.ams3.digitaloceanspaces.com/1703251417115_news::userId=1_photo_2023-12-22_00-22-53.jpg',
        },
        publishedAt: '2023-12-21T20:00:00.000Z',
        createdAt: '2023-12-22T13:23:49.000Z',
        updatedAt: '2023-12-27T06:48:42.000Z',
      };

      const mock = {
        message: 'success',
        status: true,
        code: 200,
        data: {
          items: Array.from({ length: 9 }, (_, index) => {
            const newItem = { ...mockItem, id: index + 1 };
            return newItem;
          }),
          metadata: {
            total: 1,
            limit: 2000,
            page: 1,
          },
        },
      } as any;
      return mock;
    } catch (err) {
      console.error(err);
    }

    return null;
  },
});

const $items = createStore<NewsItemNormalized[]>([]);
const $isDirty = createStore(false).on(getFx.finally, () => true);
const $isLoading = combine(getFx.pending, $isDirty, (isPending, isDirty) => isPending || !isDirty);

sample({
  clock: getFx.doneData,
  fn: ({ data }) => data.items.map(normalizeNewsItem),
  target: $items,
});

const mapDto = (lang?: SupportedLanguageCode) => {
  const language = lang || ($$i18n.i18n.language as SupportedLanguageCode) || fallbackLanguageCode;

  return {
    language,
    limit: 8,
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

export const $$newsSection = {
  opened,
  $items,
  $isLoading,
  $isDirty,
};
