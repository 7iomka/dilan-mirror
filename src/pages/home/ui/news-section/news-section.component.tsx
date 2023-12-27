import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';
import { Carousel, CarouselControls } from '@/shared/ui/carousel';
import { $$newsSection } from './news-section.model';
import type { NewsItemNormalized } from './news-section.lib';

interface NewsSectionProps {
  className?: string;
}

const NewsSection = ({ className }: NewsSectionProps) => {
  const { t } = useTranslation();
  const isLoading = useUnit($$newsSection.$isLoading);
  const items = useUnit($$newsSection.$items);

  const data = {
    title: t('news.title'),
  };

  return (
    <div id="news" className={clsx('relative py-56 md:py-88 overflow-hidden', className)}>
      <div className="relative container">
        <div className="hidden md:block absolute h-[600px] w-[600px] -z-[1] left-0 translate-y-[20%] -translate-x-[20%] bottom-0 opacity-[0.48] [background-image:radial-gradient(50%_50%_at_50%_50%,_#0C2D23_0%,_rgba(12,45,35,0)_100%)]" />
        <div className="absolute h-[600px] w-[600px] -z-[1] right-0 translate-y-[20%] translate-x-[20%] bottom-0 opacity-[0.48] [background-image:radial-gradient(50%_50%_at_50%_50%,_#0C2D23_0%,_rgba(12,45,35,0)_100%)]" />
        <h1 className="text-40px md:text-56px leading-1">{data.title}</h1>
        <div className="mt-32 md:mt-56">
          {isLoading ? (
            <div className="flex items-center justify-center h-[25rem]">
              <svg
                className="w-200 h-200 stroke-primary-pale"
                viewBox="0 0 45 45"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fff"
              >
                <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
                  <circle cx="22" cy="22" r="6" strokeOpacity="0">
                    <animate
                      attributeName="r"
                      begin="1.5s"
                      dur="3s"
                      values="6;22"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      begin="1.5s"
                      dur="3s"
                      values="1;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-width"
                      begin="1.5s"
                      dur="3s"
                      values="2;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="22" cy="22" r="6" strokeOpacity="0">
                    <animate
                      attributeName="r"
                      begin="3s"
                      dur="3s"
                      values="6;22"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      begin="3s"
                      dur="3s"
                      values="1;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-width"
                      begin="3s"
                      dur="3s"
                      values="2;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="22" cy="22" r="8">
                    <animate
                      attributeName="r"
                      begin="0s"
                      dur="1.5s"
                      values="6;1;2;3;4;5;6"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              </svg>
            </div>
          ) : (
            <NewsCarousel items={items} />
          )}
        </div>
      </div>
    </div>
  );
};

const NewsCarousel = ({ items }: { items: NewsItemNormalized[] }) => {
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
    <div className="relative">
      <Carousel
        getEmblaApi={setEmbla}
        onSlideChange={onSelect}
        viewportOverflow="unset"
        classNames={{
          viewport: 'overflow-visible lg:overflow-hidden',
          container: '-mr-24',
        }}
        options={{
          align: 'start',
          containScroll: 'trimSnaps',
          slidesToScroll: 'auto',
        }}
      >
        {items.map((item, idx) => (
          <div className="relative flex-[0_0_20rem] xl:flex-[0_0_33.3333%] pr-24" key={idx}>
            <div className="relative w-full aspect-w-16 aspect-h-9 bg-dark-500">
              <img
                src={item.mainImg}
                className={clsx('absolute inset-0 w-full h-full object-cover')}
                alt=""
              />
            </div>
            <div className="mt-20 md:mt-32">
              <h3 className="text-md md:text-xl line-clamp-2">{item.title}</h3>
              <div className="text-md md:text-lg mt-2 md:mt-4 line-clamp-3">
                {item.shortDescription}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="flex items-center justify-end gap-8 mt-24 md:mt-32">
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

export type { NewsSectionProps };
export { NewsSection };
