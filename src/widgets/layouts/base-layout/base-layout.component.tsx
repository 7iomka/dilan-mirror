import type { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { appConfig } from '@/shared/config/app-config';

interface BaseLayoutProps extends PropsWithChildren {
  className?: string;
}

const BaseLayout = ({ className, children }: BaseLayoutProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
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
          href="/static/fonts/inter/inter-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/static/fonts/inter/inter-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style type="text/css">
          {`
          /* inter-regular */
          @font-face {
            font-display: swap;
            font-family: "Inter";
            font-style: normal;
            font-weight: 400;
            src:
              url("/static/fonts/inter/inter-regular.woff2") format("woff2"),
                url("/static/fonts/inter/inter-regular.ttf") format("truetype"); 
          }
          /* inter-500 */
          @font-face {
            font-display: swap;
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            src:
              url("/static/fonts/inter/inter-500.woff2") format("woff2"),
              url("/static/fonts/inter/inter-500.ttf") format("truetype");
          }
          /* inter-700 */
          @font-face {
            font-display: swap;
            font-family: "Inter";
            font-style: normal;
            font-weight: 700;
            src:
              url("/static/fonts/inter/inter-700.woff2") format("woff2"),
              url("/static/fonts/inter/inter-700.ttf") format("truetype");
          }
        `}
        </style>
      </Helmet>

      <div className={className}>{children}</div>
    </>
  );
};

export type { BaseLayoutProps };
export { BaseLayout };
