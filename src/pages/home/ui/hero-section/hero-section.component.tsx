import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';
import { Carousel, CarouselControls } from '@/shared/ui/carousel';
import { Button } from '@/shared/ui/button';
import { Fancybox } from '@/shared/ui/fancybox';
import styles from './hero-section.module.css';

interface HeroCarouselSlide {
  src: string;
  videoId: string;
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
        videoId: 'iYdgRu5W-Dk',
      },
      {
        src: '/static/images/content/hero-section/02.jpg',
        videoId: 'EyUfHzhQGUQ',
      },
      {
        src: '/static/images/content/hero-section/03.jpg',
        videoId: 'WYetg3AuLE4',
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
      <Fancybox
        options={{
          Thumbs: {
            type: 'classic',
          },
        }}
      >
        <Carousel
          getEmblaApi={setEmbla}
          onSlideChange={onSelect}
          viewportOverflow="unset"
          classNames={{
            root: 'relative',
            viewport: 'overflow-visible md:overflow-hidden',
            container: '-mr-24',
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
        >
          {slides.map(({ src, videoId, className: imageClassName }, idx) => (
            <div className="relative flex-[0_0_95%] md:flex-[0_0_100%] pr-24" key={idx}>
              <div className="relative w-full h-0 pb-[125%] md:pb-[calc(622*100%/829)] overflow-hidden">
                <img
                  src={src}
                  className={clsx(imageClassName, 'absolute inset-0 w-full h-full object-cover')}
                  alt=""
                />
                <div className="pointer-events-none absolute -left-1 -top-1 -bottom-1 w-[30%] bg-[linear-gradient(270deg,rgba(20,20,25,0.00)_0%,#141419_100%)] z-[1] hidden lg:block" />
                <div className="pointer-events-none absolute -left-1 -right-1 -bottom-1 h-[30%] bg-[linear-gradient(180deg,rgba(20,20,25,0.00)_0%,#141419_100%)] z-[1] hidden md:block xl:hidden" />
                <div className={styles.playButton}>
                  <a
                    data-fancybox={videoId}
                    href={`https://www.youtube.com/${videoId}&amp;autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=0`}
                    type="image"
                  >
                    <svg
                      className={styles.playButtonIcon}
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="230"
                      height="230"
                      viewBox="0 0 230 230"
                    >
                      <defs>
                        <filter id="blur-play-fx" filterUnits="userSpaceOnUse">
                          <feFlood floodColor="#FFFFFF" floodOpacity="0.530" />
                          <feComposite operator="in" in2="SourceAlpha" result="outGlowFill" />
                          <feMorphology operator="dilate" radius="2" result="outGlowFill" />
                          <feGaussianBlur stdDeviation="4.7" result="outGlowBlur" />
                          <feComposite
                            operator="out"
                            in="outGlowBlur"
                            in2="SourceAlpha"
                            result="outGlowMasked"
                          />
                          <feComposite
                            operator="over"
                            in="outGlowMasked"
                            in2="SourceGraphic"
                            result="outerGlow"
                          />
                        </filter>
                      </defs>
                      <g>
                        <g className={styles.playButtonCircle} filter="url(#blur-play-fx)">
                          <path
                            className="transition-all duration-500"
                            d="M115.000,14.406 C170.557,14.406 215.594,59.443 215.594,115.000 C215.594,170.557 170.557,215.594 115.000,215.594 C59.443,215.594 14.406,170.557 14.406,115.000 C14.406,59.443 59.443,14.406 115.000,14.406 z"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="5"
                          />
                        </g>
                        <path
                          className={clsx(styles.playButtonTriangle, 'transition-all duration-500')}
                          d="M155.526,114.519 L90.858,151.856 L90.858,77.183 L155.526,114.519 z"
                          fill="#FFFFFF"
                          filter="url(#blur-play-fx)"
                        />
                      </g>
                    </svg>
                    <span className={clsx(styles.playButtonOuterCircle, styles.n1)} />
                    <span className={clsx(styles.playButtonOuterCircle, styles.n2)} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Fancybox>
      <div className="hidden md:flex items-center justify-end gap-8 mt-58 lg:mt-24 relative z-20">
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
