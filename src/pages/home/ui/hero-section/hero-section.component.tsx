import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Carousel } from '@/shared/ui/carousel';
import { ResponsivePicture } from '@/shared/ui/responsive-picture';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps) => {
  const { t } = useTranslation();

  const slides: {
    imageSrcWithoutExtension: string;
    actionImagesSrc: string;
    actionText: string;
    slideClassName?: string;
    slideContentClassName?: string;
    pictureBoxClassName?: string;
    reflectionContentClassName?: string;
  }[] = [
    {
      imageSrcWithoutExtension: '/static/images/content/hero-section/01',
      actionImagesSrc: '/static/images/content/hero-section/01-action.jpg',
      actionText: t('heroSection.slide1Text'),
      slideClassName: 'flex-[0_0_100%]',
      slideContentClassName: 'w-[38rem]',
      pictureBoxClassName: 'pb-[calc((816/608)_*_100%)]',
      reflectionContentClassName: 'left-[50%] -translate-x-[50%]',
    },
    {
      imageSrcWithoutExtension: '/static/images/content/hero-section/02',
      actionImagesSrc: '/static/images/content/hero-section/02-action.jpg',
      actionText: t('heroSection.slide2Text'),
      slideClassName: 'flex-[0_0_100%]',
      slideContentClassName: 'w-[49.9375rem]',
      pictureBoxClassName: 'pb-[calc((829/799)_*_100%)]',
      reflectionContentClassName: 'left-[50%] -translate-x-[40%]',
    },
    {
      imageSrcWithoutExtension: '/static/images/content/hero-section/03',
      actionImagesSrc: '/static/images/content/hero-section/03-action.jpg',
      actionText: t('heroSection.slide3Text'),
      slideClassName: 'flex-[0_0_100%]',
      slideContentClassName: 'w-[25.8125rem]',
      pictureBoxClassName: 'pb-[calc((804/413)_*_100%)]',
      reflectionContentClassName: 'left-[50%] -translate-x-[50%]',
    },
  ];

  return (
    <section className={clsx(className)}>
      <div className="pb-20 lg:pb-56 lg:-mb-56">
        <div className="container">
          <div className="row items-center">
            <div className="col-12 lg:col-6 relative z-[1]">
              <div className="text-[0.5rem] md:text-xs leading-1 tracking-[0.4em] font-bold uppercase">
                {t('heroSection.textBeforeTitle')}
              </div>
              <h1 className="text-40px md:text-72px leading-1 mt-8 md:mt-20">
                {t('heroSection.title')}
              </h1>
              <div className="text-xl md:text-2xl mt-12 md:mt-24">
                {t('heroSection.textAfterTitle')}
              </div>
            </div>
            <div className="col-12 lg:col-6">
              <div className="-mx-120 -mt-60 lg:-mt-80 pt-60 lg:pt-80 overflow-hidden">
                <Carousel
                  overflowVisible
                  options={{ loop: true }}
                  plugins={[
                    // {
                    //   name: 'Autoplay',
                    //   options: { delay: 3000 },
                    // },
                    { name: 'AutoHeight' },
                    {
                      name: 'ClassNames',
                    },
                  ]}
                >
                  {slides.map(
                    (
                      {
                        actionImagesSrc,
                        actionText,
                        imageSrcWithoutExtension,
                        slideClassName,
                        pictureBoxClassName,
                        slideContentClassName,
                        reflectionContentClassName,
                      },
                      idx,
                    ) => {
                      return (
                        // 👇 style each individual slide.
                        // relative - needed since we use the fill prop from next/image component
                        // h-64 - arbitrary height
                        // flex[0_0_100%]
                        //   - shorthand for flex-grow:0; flex-shrink:0; flex-basis:100%
                        //   - we want this slide to not be able to grow or shrink and take up 100% width of the viewport.
                        <div
                          className={clsx('flex relative min-w-0 select-none', slideClassName)}
                          key={idx}
                        >
                          <div className="inline-flex min-w-[37.5rem] justify-center">
                            <div
                              className={clsx(
                                'h-[51rem] flex flex-col justify-end',
                                slideContentClassName,
                              )}
                            >
                              {/* use object-cover + fill since we don't know the height and width of the parent */}

                              <ResponsivePicture
                                srcWithoutExtension={imageSrcWithoutExtension}
                                extension="png"
                                className={pictureBoxClassName}
                              />
                            </div>
                          </div>
                          <div className="absolute -z-[1] -top-60 lg:-top-80 pt-60 lg:pt-80 bottom-0 right-120 bg-dark-800 w-[25rem] overflow-hidden">
                            <img
                              className="absolute inset-0 object-cover [object-position:50%_100%] -z-[1]"
                              src="/static/images/content/hero-section/mirror-bg.jpg"
                              alt=""
                              aria-hidden="true"
                            />
                            <div
                              className={clsx(
                                'absolute bottom-0',
                                slideContentClassName,
                                reflectionContentClassName,
                              )}
                            >
                              <ResponsivePicture
                                srcWithoutExtension={imageSrcWithoutExtension}
                                extension="png"
                                className={clsx(pictureBoxClassName, 'opacity-[32%]')}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { HeroSectionProps };
export { HeroSection };
