import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';
import type { CarouselProps } from '@/shared/ui/carousel';
import { Carousel, CarouselControls } from '@/shared/ui/carousel';
import { ResponsivePicture } from '@/shared/ui/responsive-picture';
import { Button } from '@/shared/ui/button';

interface HeroCarouselSlide {
  src: string;
  className?: string;
}
interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps) => {
  const { t } = useTranslation();

  const data = {
    actionText: t('actions.createAccount'),
    textBeforeTitle: t('hero.textBeforeTitle'),
    title: t('hero.title'),
    textAfterTitle: t('hero.textAfterTitle'),
    slides: [
      {
        src: '/static/images/content/hero-section/01.jpg',
      },
      {
        src: '/static/images/content/hero-section/02.jpg',
        className: 'object-[70%_50%]',
      },
      {
        src: '/static/images/content/hero-section/03.jpg',
      },
    ] as HeroCarouselSlide[],
  };

  return (
    <section id="hero" className={clsx(className)}>
      <div className="relative pb-20 xl:pb-56 xl:-mb-56 flex flex-col justify-end">
        <div className="overflow-hidden md:overflow-visible">
          <div className="container xl:pb-70">
            <div className="row items-end xl:items-center md:flex-nowrap">
              <div className="col-12 md:col-8 lg:col-6 relative z-[10] xl:py-70 order-1 md:order-0 mt-40 md:mt-0">
                <div className="text-[0.5rem] md:text-xs leading-1 tracking-[0.4em] font-bold uppercase [text-shadow:0px_1px_3px_rgb(41,41,41,0.5),0px_0px_40px_rgb(41,41,41,0.8)]">
                  {data.textBeforeTitle}
                </div>
                <h1 className="text-40px md:text-56px lp:text-72px leading-1 mt-8 md:mt-20 [text-shadow:0px_2px_3px_rgb(41,41,41,0.5),0px_0px_40px_rgb(41,41,41,0.8)]">
                  {data.title}
                </h1>
                <div className="text-xl md:text-2xl mt-12 md:mt-24 [text-shadow:0px_2px_3px_rgb(41,41,41,0.5),0px_0px_40px_rgb(41,41,41,0.8)] [text-wrap:balance]">
                  {data.textAfterTitle}
                </div>
                <Button
                  className="inline-flex justify-center min-w-200 max-w-full mt-25 lg:mt-48"
                  component="a"
                  href="#!"
                >
                  {data.actionText}
                </Button>
              </div>
              <div className="col-12 lg:col-10 xl:col-8 md:-ml-[66.66667%] lg:-ml-[33.33333%] xl:-ml-[16.66667%] md:pb-170 lg:pb-100 xl:pb-0">
                <HeroCarousel slides={data.slides} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroCarousel = ({ slides }: { slides: HeroCarouselSlide[] }) => {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, [embla]);

  const handlePrev = useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    embla?.scrollNext();
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    onSelect();
    embla.on('reInit', onSelect);
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <div>
      <Carousel
        getEmblaApi={setEmbla}
        onSlideChange={onSelect}
        viewportOverflow="unset"
        classNames={{
          root: 'relative',
          viewport: 'overflow-visible md:overflow-hidden',
          container: '-mr-24 md:mr-0',
        }}
        options={{
          align: 'start',
          containScroll: 'trimSnaps',
          slidesToScroll: 'auto',
          loop: true,
          duration: 50,
        }}
        plugins={[
          {
            name: 'Autoplay',
            options: { delay: 6000, stopOnInteraction: false },
          },
        ]}
        rootContent={
          <>
            <div className="pointer-events-none absolute -left-1 -top-1 -bottom-1 w-[30%] bg-[linear-gradient(270deg,rgba(20,20,25,0.00)_0%,#141419_100%)] z-[1] hidden lg:block" />
            <div className="pointer-events-none absolute -left-1 -right-1 -bottom-1 h-[30%] bg-[linear-gradient(180deg,rgba(20,20,25,0.00)_0%,#141419_100%)] z-[1] hidden md:block xl:hidden" />
          </>
        }
      >
        {slides.map(({ src, className: imageClassName }, idx) => (
          <div className="relative flex-[0_0_95%] md:flex-[0_0_100%] pr-24 md:pr-0" key={idx}>
            <div className="relative w-full h-0 pb-[125%] md:pb-[calc(622*100%/829)]">
              <img
                src={src}
                className={clsx(imageClassName, 'absolute inset-0 w-full h-full object-cover')}
                alt=""
              />
            </div>
          </div>
        ))}
      </Carousel>
      <div className="hidden md:flex items-center justify-end gap-8 mt-58 lg:mt-24">
        <CarouselControls
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export type { HeroSectionProps };
export { HeroSection };
