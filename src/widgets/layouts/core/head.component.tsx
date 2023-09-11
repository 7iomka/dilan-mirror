import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { appConfig } from '@/shared/config/app-config';

const Head = () => {
  const { t, i18n } = useTranslation();

  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>
      {/* Favicon stuff */}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#f09731" />
      <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />

      {/* Meta and OpenGraph */}
      <title>{t('meta.title')}</title>
      <meta property="og:title" content={t('meta.title')} />

      <meta name="description" content={t('meta.description')} />
      <meta property="og:description" content={t('meta.description')} />
      <meta property="og:url" content={appConfig.appBaseURL} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`${appConfig.appBaseURL}/static/images/og/default_1200x630.jpg`}
      />
      <meta property="og:image:alt" content={t('meta.title')} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ru" />
      <meta property="og:site_name" content={t('meta.title')} />

      {/* preload fonts */}
      <link
        rel="preload"
        href="/static/fonts/aeonik-bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/static/fonts/aeonik-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <style type="text/css">
        {`
          @font-face {
            font-family: "Aeonik";
            src:
              url("/static/fonts/aeonik-regular.woff2") format("woff2"),
              url("/static/fonts/aeonik-regular.woff") format("woff");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Aeonik";
            src:
              url("/static/fonts/aeonik-bold.woff2") format("woff2"),
              url("/static/fonts/aeonik-bold.woff") format("woff");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `.trim()}
      </style>
    </Helmet>
  );
};

export { Head };
