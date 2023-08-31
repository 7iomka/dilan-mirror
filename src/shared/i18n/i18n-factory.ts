import { createEffect, createStore } from 'effector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { createFactory } from '@withease/factories';

type Params = {
  // resources: Record<string, any>;
};

const createi18n = createFactory(() => {
  const changeLanguageFx = createEffect(changeLanguage);

  const setupFx = createEffect(setup);

  const $i18n = createStore(i18n);

  async function setup({ lng }: { lng: string }) {
    await i18n
      // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
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
        lng,
        fallbackLng: 'en',
        debug: true,
        load: 'languageOnly',
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
          loadPath: '/locales/{{lng}}.json', // store locales in public subfolder
        },
        saveMissing: true, // safe use default value as second parameter
      });
  }

  async function changeLanguage({ lng }: { lng: string }) {
    await i18n.changeLanguage(lng);
  }

  return {
    i18n,
    $i18n,
    setupFx,
    changeLanguageFx,
  };
});

export { i18n, createi18n };
