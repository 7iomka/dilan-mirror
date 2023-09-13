import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';
import type { CarouselProps } from '@/shared/ui/carousel';
import { Carousel } from '@/shared/ui/carousel';
import { ResponsivePicture } from '@/shared/ui/responsive-picture';

interface HeroCarouselSlide {
  imageSrcWithoutExtension: string;
  actionImagesSrc: string;
  actionText: string;
  slideClassName?: string;
  slideContentClassName?: string;
  pictureBoxClassName?: string;
  reflectionContentClassName?: string;
}

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps) => {
  const { t } = useTranslation();

  const slides: HeroCarouselSlide[] = [
    {
      imageSrcWithoutExtension: '/static/images/content/hero-section/01',
      actionImagesSrc: '/static/images/content/hero-section/01-action.jpg',
      actionText: t('heroSection.slide1Text'),
      slideClassName: 'flex-[0_0_100%]',
      slideContentClassName: 'w-full md:w-[38rem]',
      pictureBoxClassName: 'object-left-bottom pb-[calc((816/608)_*_100%)]',
      reflectionContentClassName: 'left-[50%] -translate-x-[50%]',
    },
    {
      imageSrcWithoutExtension: '/static/images/content/hero-section/02',
      actionImagesSrc: '/static/images/content/hero-section/02-action.jpg',
      actionText: t('heroSection.slide2Text'),
      slideClassName: 'flex-[0_0_100%]',
      slideContentClassName: 'w-full md:w-[49.9375rem]',
      pictureBoxClassName: 'object-left-bottom pb-[calc((829/799)_*_100%)]',
      reflectionContentClassName: 'left-[50%] -translate-x-[40%]',
    },
    {
      imageSrcWithoutExtension: '/static/images/content/hero-section/03',
      actionImagesSrc: '/static/images/content/hero-section/03-action.jpg',
      actionText: t('heroSection.slide3Text'),
      slideClassName: 'flex-[0_0_100%]',
      slideContentClassName: 'w-full md:w-[25.8125rem]',
      pictureBoxClassName: 'object-left-bottom pb-[calc((804/413)_*_100%)]',
      reflectionContentClassName: 'left-[50%] -translate-x-[50%]',
    },
  ];

  return (
    <section className={clsx(className)}>
      <div className="relative pb-20 lg:pb-56 lg:-mb-56 min-h-[37.5rem] md:min-h-[56.25rem] lg:min-h-0 flex flex-col justify-end">
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
            <div className="col-12 lg:col-6 absolute inset-0 px-0 lg:static">
              <CarouselContainer slides={slides} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CarouselContainer = ({ slides }: { slides: HeroCarouselSlide[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [emblaReflection, setEmblaReflection] = useState<EmblaCarouselType | null>(null);

  const handleSlideChange = useCallback(
    (index: number) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex],
  );

  useEffect(() => {
    if (!embla || !emblaReflection) return;

    embla.scrollTo(selectedIndex);
    emblaReflection.scrollTo(selectedIndex);
  }, [embla, emblaReflection, selectedIndex]);

  return (
    <div className="lg:-mx-[7.5rem] -mt-60 lg:-mt-80 pt-60 lg:pt-80 overflow-hidden lg:relative">
      <MainCarousel slides={slides} getEmblaApi={setEmbla} onSlideChange={handleSlideChange} />
      <div className="flex flex-col items-center justify-end absolute -z-[1] top-0 bottom-0 right-0 w-[25rem] overflow-hidden bg-dark pt-[inherit]">
        <div className="absolute left-0 bottom-0 h-full w-full bg-[linear-gradient(180deg,#b6bfc8_82.28%,rgba(182,191,200,0)_100%)] opacity-[0.32] mix-blend-multiply" />
        <div className="absolute left-30% top-0 h-[50%] w-[300%] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0)_100%)] opacity-[0.32] -rotate-45 -translate-x-[50%]" />
        <img
          className="absolute inset-0 object-cover [object-position:50%_100%] -z-[1]"
          src="/static/images/content/hero-section/mirror-bg.jpg"
          alt=""
          aria-hidden="true"
        />
        <ReflectionCarousel
          slides={slides}
          getEmblaApi={setEmblaReflection}
          onSlideChange={handleSlideChange}
        />
      </div>
      <PaginationWithPreviews
        className="hidden lg:block absolute bottom-0 right-0 w-[25rem]"
        slides={slides}
        value={selectedIndex}
        onChange={handleSlideChange}
      />
    </div>
  );
};

const MainCarousel = ({
  slides,
  getEmblaApi,
  options,
  ...rest
}: Omit<CarouselProps, 'viewportOverflow' | 'plugins'> & {
  slides: HeroCarouselSlide[];
}) => {
  return (
    <Carousel
      viewportOverflow="visible"
      options={{ loop: true, ...options }}
      getEmblaApi={getEmblaApi}
      plugins={[
        {
          name: 'Autoplay',
          options: { delay: 3000 },
        },
        { name: 'AutoHeight' },
        {
          name: 'ClassNames',
        },
      ]}
      {...rest}
    >
      {slides.map(
        (
          { imageSrcWithoutExtension, slideClassName, pictureBoxClassName, slideContentClassName },
          idx,
        ) => {
          return (
            <div className={clsx('flex relative min-w-0 select-none', slideClassName)} key={idx}>
              <div className="inline-flex min-w-[32rem] md:min-w-[37.5rem] justify-center">
                <div
                  className={clsx(
                    'shrink-0 h-[34rem] md:h-[51rem] flex flex-col justify-end',
                    slideContentClassName,
                  )}
                >
                  <ResponsivePicture
                    srcWithoutExtension={imageSrcWithoutExtension}
                    extension="png"
                    className={pictureBoxClassName}
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          );
        },
      )}
    </Carousel>
  );
};

const ReflectionCarousel = ({
  slides,
  getEmblaApi,
  options,
  ...rest
}: Omit<CarouselProps, 'viewportOverflow' | 'plugins'> & {
  slides: HeroCarouselSlide[];
}) => {
  return (
    <Carousel
      getEmblaApi={getEmblaApi}
      className={`
      w-[calc((var(--container-max-width)_-_var(--container-gutter)))]
      lg:w-[calc((var(--container-max-width)_-_var(--container-gutter))/2_+_7.5rem)]
      `}
      options={{ loop: true, watchDrag: false, ...options }}
      plugins={[
        {
          name: 'Autoplay',
          options: { delay: 3000 },
        },
        { name: 'AutoHeight' },
        {
          name: 'ClassNames',
        },
      ]}
      {...rest}
    >
      {slides.map(
        (
          { imageSrcWithoutExtension, slideClassName, pictureBoxClassName, slideContentClassName },
          idx,
        ) => (
          <div
            className={clsx('flex justify-center relative min-w-0 select-none', slideClassName)}
            key={idx}
          >
            <div className="inline-flex min-w-[32rem] md:min-w-[37.5rem] justify-center">
              <div
                className={clsx(
                  'shrink-0 h-[34rem] md:h-[51rem] flex flex-col justify-end',
                  slideContentClassName,
                )}
              >
                <ResponsivePicture
                  srcWithoutExtension={imageSrcWithoutExtension}
                  extension="png"
                  className={pictureBoxClassName}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        ),
      )}
    </Carousel>
  );
};

const PaginationWithPreviews = ({
  slides,
  value,
  onChange,
  className,
}: {
  slides: HeroCarouselSlide[];
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <div className={clsx(className)}>
      {slides.map(({ actionImagesSrc, actionText }, idx) => {
        return (
          <button
            type="button"
            className={clsx(
              'flex select-none items-center p-24 transition-colors',
              value === idx && 'bg-dark',
              value !== idx && 'hover:bg-dark/30',
            )}
            key={idx}
            onClick={() => onChange(idx)}
          >
            <img
              className="w-64 h-64 shrink-0"
              width={64}
              height={64}
              src={actionImagesSrc}
              alt=""
            />
            <div className="ml-20">
              <div className="text-left text-2xl text-gray-700">{actionText}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export type { HeroSectionProps };
export { HeroSection };
