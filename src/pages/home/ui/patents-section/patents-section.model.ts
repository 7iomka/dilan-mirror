import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector';
import { Fancybox } from '@fancyapps/ui';
import { $$patent, patentCountryCodes } from '@/entities/patent';
import { fallbackLanguageCode, type SupportedLanguageCode } from '@/shared/config/i18n-config';
import { $$i18n } from '@/shared/i18n';
import { currentRoute } from '../../home.model';
import { PATENTS_ITEM_MODAL_ID } from './patents-section.lib';

const mapDto = (lang?: SupportedLanguageCode) => {
  const language = lang || ($$i18n.i18n.language as SupportedLanguageCode) || fallbackLanguageCode;

  return {
    language,
  };
};

const $allItems = createStore(
  patentCountryCodes.map((code) => ({ code, pdf: null, status: null, url: null })),
);
const $activeItems = combine($allItems, $$patent.$patents, (allItems, fetchedItems) => {
  const supportedCodes = new Set(allItems.map((item) => item.code));

  const processedCodes = new Set();

  return fetchedItems
    .filter((item) => {
      if (supportedCodes.has(item.code as any) && !processedCodes.has(item.code)) {
        processedCodes.add(item.code);
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      const aConf = a.status === 'confirmed';
      const bConf = b.status === 'confirmed';

      if (aConf && !bConf) return -1;
      if (!aConf && bConf) return 1;
      return 0;
    });
});

const $futureItems = combine($allItems, $$patent.$patents, (allItems, fetchedItems) =>
  allItems.filter((item) => !fetchedItems.find((v) => v.code === item.code)),
);

const openDetailsByCountryCodeTriggered = createEvent<string>();
const activeCountryCodeChanged = createEvent<string | null>();
const $activeCountryCode = restore(activeCountryCodeChanged, null);
const $activeItem = combine($activeCountryCode, $$patent.$patents, (activeCountryCode, items) => {
  return items.find(({ code }) => code === activeCountryCode) ?? null;
});

sample({
  clock: openDetailsByCountryCodeTriggered,
  target: activeCountryCodeChanged,
});

sample({
  clock: openDetailsByCountryCodeTriggered,
  target: createEffect(() => {
    Fancybox.show([
      {
        src: `#${PATENTS_ITEM_MODAL_ID}`,
        type: 'inline',
      },
    ]);
  }),
});

sample({
  clock: currentRoute.opened,
  fn: ({ params }) => {
    return mapDto('lang' in params ? (params.lang as SupportedLanguageCode) : undefined);
  },
  target: $$patent.patentsRequested,
});

sample({
  clock: $$i18n.languageChanged,
  fn: mapDto,
  target: $$patent.patentsRequested,
});

export const $$patentsSection = {
  $activeItems,
  $futureItems,
  openDetailsByCountryCodeTriggered,
  $activeCountryCode,
  $activeItem,
};
