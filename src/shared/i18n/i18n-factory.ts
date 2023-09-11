import { attach, createEffect, createEvent, sample } from 'effector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { createFactory } from '@withease/factories';
import type { SupportedLanguageCode } from '../config/i18n-config';
import { fallbackLanguageCode, i18nConfig } from '../config/i18n-config';
import { router } from '../routing';

type ChangeLanguageParams = {
  languageCode: SupportedLanguageCode;
};

const createi18n = createFactory(() => {
  const changeLanguageFx = attach({
    source: router.$activeRoutes,
    effect: async (activeRoutes, { languageCode }: ChangeLanguageParams) => {
      await i18n.changeLanguage(languageCode);

      const currentRoute = activeRoutes[0]; // TODO: add support for multiple routes

      currentRoute.navigate({
        params: { lang: languageCode === fallbackLanguageCode ? undefined : languageCode },
        query: {},
        replace: true,
      });
    },
  });

  const changeLanguageTriggered = createEvent<ChangeLanguageParams>();

  sample({
    clock: changeLanguageTriggered,
    target: changeLanguageFx,
  });

  const setupFx = createEffect(setup);
  const setupTriggered = createEvent();
  sample({
    clock: setupTriggered,
    target: setupFx,
  });

  async function setup() {
    await i18n
      // load translation using http -> see /public/static/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
      // learn more: https://github.com/i18next/i18next-http-backend
      .use(Backend)
      // detect user language
      // learn more: https://github.com/i18next/i18next-browser-languageDetector
      .use(LanguageDetector)
      // pass the i18n instance to react-i18next.
      .use(initReactI18next)
      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        fallbackLng: 'en',
        supportedLngs: i18nConfig.supportedLangs,
        nonExplicitSupportedLngs: true, // support language variation
        debug: true,
        load: 'languageOnly',
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
          loadPath: '/static/locales/{{lng}}.json', // store locales in public subfolder
        },
        saveMissing: true, // safe use default value as second parameter
        detection: {
          order: ['path'],
        },
      });
  }

  return {
    i18n,
    setupFx,
    setupTriggered,
    changeLanguageFx,
    changeLanguageTriggered,
  };
});

export type { ChangeLanguageParams };
export { i18n, createi18n };
