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

const $pendingItems = $$patent.$patents.map((items) =>
  items.filter(({ status }) => status === 'pending'),
);

const $futureAndPendingItems = combine($allItems, $pendingItems, (allItems, pendingItems) =>
  allItems.map((item) => {
    const exItem = pendingItems.find((v) => v.code === item.code);
    return exItem ?? item;
  }),
);

const $confirmedItems = $$patent.$patents.map((items) =>
  items.filter(({ status }) => status === 'confirmed'),
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
  $futureAndPendingItems,
  $confirmedItems,
  openDetailsByCountryCodeTriggered,
  $activeCountryCode,
  $activeItem,
  // $items,
  // $isItemsLoading,
  // $isItemsDirty,
  // openDetailsTriggered,
  // $itemDetails,
  // $isItemDetailsLoading,
};
