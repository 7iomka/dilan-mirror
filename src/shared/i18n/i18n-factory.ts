import type { EffectParams } from 'effector';
import { createEffect, createEvent, createStore, sample } from 'effector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { createFactory } from '@withease/factories';
import { i18nConfig } from '../config/i18n-config';

const createi18n = createFactory(() => {
  const changeLanguageFx = createEffect(changeLanguage);
  const changeLanguageTriggered = createEvent<EffectParams<typeof changeLanguageFx>>();
  sample({
    clock: changeLanguageTriggered,
    target: changeLanguageFx,
  });

  const setupFx = createEffect(setup);
  const setupTriggered = createEvent<EffectParams<typeof setupFx>>();
  sample({
    clock: setupTriggered,
    target: setupFx,
  });

  const $i18n = createStore(i18n);

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

  async function changeLanguage({ lng }: { lng: string }) {
    await i18n.changeLanguage(lng);
  }

  return {
    i18n,
    $i18n,
    setupFx,
    setupTriggered,
    changeLanguageFx,
    changeLanguageTriggered,
  };
});

export { i18n, createi18n };
