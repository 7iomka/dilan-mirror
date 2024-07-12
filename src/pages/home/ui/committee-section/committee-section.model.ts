import { combine, createEffect, createEvent, restore, sample } from 'effector';
import { Fancybox } from '@fancyapps/ui';
import { debug } from 'patronum/debug';
import { $$committee } from '@/entities/committee';
import { fallbackLanguageCode, type SupportedLanguageCode } from '@/shared/config/i18n-config';
import { $$i18n } from '@/shared/i18n';
import { currentRoute } from '../../home.model';
import { COMMITTEE_MEMBER_MODAL_ID } from './committee-section.lib';

const mapDto = (lang?: SupportedLanguageCode) => {
  const language = lang || ($$i18n.i18n.language as SupportedLanguageCode) || fallbackLanguageCode;

  return {
    language,
  };
};

const openDetailsByIdTriggered = createEvent<string | number>();
const activeIdChanged = createEvent<string | number | null>();
const $activeId = restore(activeIdChanged, null);
const $activeItem = combine($activeId, $$committee.$list, (activeId, items) => {
  return items.find(({ id }) => id === activeId) ?? null;
});

sample({
  clock: openDetailsByIdTriggered,
  target: activeIdChanged,
});

sample({
  clock: openDetailsByIdTriggered,
  target: createEffect(() => {
    Fancybox.show([
      {
        src: `#${COMMITTEE_MEMBER_MODAL_ID}`,
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
  target: $$committee.listRequested,
});

// sample({
//   clock: $$i18n.languageChanged,
//   fn: mapDto,
//   target: $$committee.listRequested,
// });

// By country
const activeCountryCodeChanged = createEvent<string | null>();
const $activeCountryCode = restore(activeCountryCodeChanged, null);
const $availableCountryCodes = $$committee.$list.map((list) =>
  Array.from(new Set(list.map((item) => item.country.toLowerCase()))),
);

const $listByCountryCode = combine(
  $$committee.$list,
  $activeCountryCode,
  (list, activeCountryCode) =>
    list.filter((item) => item.country.toLowerCase() === activeCountryCode),
);

export const $$committeeSection = {
  openDetailsByIdTriggered,
  $activeId,
  $activeItem,
  activeCountryCodeChanged,
  $activeCountryCode,
  $listByCountryCode,
  $availableCountryCodes,
};
