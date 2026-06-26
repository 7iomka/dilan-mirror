import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Icon, type IconProps } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { appConfig } from '@/shared/config/app-config';

interface ArgumentsSectionProps {
  className?: string;
}

const ArgumentsSection = ({ className }: ArgumentsSectionProps) => {
  const { t } = useTranslation();
  const data = {
    title: t('arguments.title'),
    items: [
      {
        title: t('arguments.item1.title'),
        description: t('arguments.item1.description'),
        iconName: 'sun',
      },
      {
        title: t('arguments.item2.title'),
        description: t('arguments.item2.description'),
        iconName: 'map',
      },
      {
        title: t('arguments.item3.title'),
        description: t('arguments.item3.description'),
        iconName: 'time',
      },
      {
        title: t('arguments.item4.title'),
        description: t('arguments.item4.description'),
        iconName: 'mirror',
      },
    ] as { title: string; description: string; iconName: IconProps['name'] }[],
    imageDesktop: '/static/images/content/arguments-section/arguments-desktop.jpg?d=050620241528',
    imageMobile: '/static/images/content/arguments-section/arguments-mobile.jpg?d=050620241528',
    imageHeadLine: t('arguments.imageHeadLine'),
    imageSubHeadLine: t('arguments.imageSubHeadLine'),
    actionText: t('arguments.actionText'),
  };

  return (
    <section id="arguments" className={clsx('bg-white text-dark-800', className)}>
      <div className="pt-56 md:pt-88">
        <div className="container">
          <h2 className="text-40px md:text-56px whitespace-pre-wrap text-center">{data.title}</h2>
          <div className="mt-32 md:mt-56">
            <div className="row gy-24 justify-center">
              {data.items.map((item) => (
                <div className="col-6 lg:col-3" key={item.title}>
                  <div className="flex items-center justify-center w-56 h-56 md:w-72 md:h-72 border border-gray-400">
                    <Icon name={item.iconName} className="text-[2rem] text-primary-dark" />
                  </div>
                  <h3 className="text-md md:text-xl mt-20 md:mt-32">{item.title}</h3>
                  <div className="text-md md:text-lg mt-2 md:mt-4">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
          <hr className="mt-56 md:mt-88 border-gray-400" />
        </div>
      </div>
      <div
        className={`pt-56 md:pt-88
        md:bg-gradient-to-b from-white from-80%
        via-white via-80%
        to-dark-500 to-80%
      `}
      >
        <div className="container">
          <div className="lg:relative">
            <div className="relative aspect-w-[1024] aspect-h-[724] sm:aspect-w-[1296] sm:aspect-h-[705] max-xsl:min-w-container-min max-xsl:left-1/2 max-xsl:-translate-x-1/2">
              <picture>
                <source media="(max-width: 575px)" srcSet={data.imageMobile} />
                <source media="(min-width: 576px)" srcSet={data.imageDesktop} />
                <img className="object-cover w-full h-full" src={data.imageDesktop} alt="" />
                {/* <div className="hidden lg:block absolute inset-0 bg-[linear-gradient(0deg,black_0%,rgb(0,0,0,0.3)_15%,rgb(0,0,0,0))]" /> */}
              </picture>
            </div>

            <div className="z-[2] flex flex-col items-center justify-end ">
              <div className="bg-white py-24 md:p-24 w-full">
                <div className="row gy-40 lg:gx-60 lg:flex-nowrap">
                  <div className="col-12 lg:col">
                    <h4 className="text-md md:text-xl whitespace-pre-wrap">{data.imageHeadLine}</h4>
                    <div className="mt-4 text-md md:text-lg whitespace-pre-wrap">
                      {data.imageSubHeadLine}
                    </div>
                  </div>
                  <div className="col-12 lg:col-auto flex items-center justify-center">
                    <Button
                      className="flex justify-center min-w-200"
                      component="a"
                      href={appConfig.accountURL}
                    >
                      {data.actionText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { ArgumentsSectionProps };
export { ArgumentsSection };
