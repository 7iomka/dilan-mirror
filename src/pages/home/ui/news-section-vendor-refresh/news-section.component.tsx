import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';
import xss from 'xss';
import { Carousel, CarouselControls } from '@/shared/ui/carousel';
import { Fancybox } from '@/shared/ui/fancybox';
import { $$newsSection } from './news-section.model';
import { NEWS_ITEM_MODAL_ID, type NewsListItemNormalized } from './news-section.lib';

interface NewsSectionProps {
  className?: string;
}

const NewsSection = ({ className }: NewsSectionProps) => {
  const { t } = useTranslation();
  const isLoading = useUnit($$newsSection.$isItemsLoading);
  const items = useUnit($$newsSection.$items);

  return (
    <section id="news" className={clsx('relative py-56 md:py-88 overflow-hidden', className)}>
      <div className="relative container">
        <div className="hidden md:block absolute h-[600px] w-[600px] -z-[1] left-0 translate-y-[20%] -translate-x-[20%] bottom-0 opacity-[0.48] [background-image:radial-gradient(50%_50%_at_50%_50%,_#0C2D23_0%,_rgba(12,45,35,0)_100%)]" />
        <div className="absolute h-[600px] w-[600px] -z-[1] right-0 translate-y-[20%] translate-x-[20%] bottom-0 opacity-[0.48] [background-image:radial-gradient(50%_50%_at_50%_50%,_#0C2D23_0%,_rgba(12,45,35,0)_100%)]" />
        <h2 className="text-40px md:text-56px leading-1">{t('news.title')}</h2>
        <div className="mt-32 md:mt-56">
          {isLoading ? (
            <div className="flex items-center justify-center h-[25rem]">
              <SvgLoader />
            </div>
          ) : (
            <NewsCarousel items={items} />
          )}
        </div>
      </div>
    </section>
  );
};

const NewsCarousel = ({ items }: { items: NewsListItemNormalized[] }) => {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const handleOpenItemDetails = useUnit($$newsSection.openDetailsTriggered);

  const onSelect = useCallback(() => {
    if (!embla) {
      return;
    }

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
    if (!embla) {
      return;
    }

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
        {items.map((item) => (
          <div
            className="relative flex-[0_0_20rem] xl:flex-[0_0_33.3333%] pr-24"
            key={`news_item_${item.slug}`}
          >
            <Fancybox
              options={{
                Carousel: {
                  Thumbs: {
                    type: 'classic',
                  },
                },
              }}
            >
              <button
                type="button"
                className="cursor-pointer group text-left"
                onClick={() => handleOpenItemDetails(item.slug)}
              >
                <div className="relative w-full aspect-w-1 aspect-h-1 bg-dark-500">
                  {item.mainImg ? (
                    <img
                      src={item.mainImg}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-70"
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-dark-500 text-sm font-semibold text-slate-300">
                      DILAN MIRROR
                    </div>
                  )}
                  <div className="text-sm font-bold py-4 px-8 bg-dark/90 absolute bottom-5 right-5 inline-block !w-auto !h-auto !left-auto !top-auto">
                    {item.publishedDate}
                  </div>
                </div>
                <div className="mt-20 md:mt-32">
                  <h3 className="text-md md:text-xl line-clamp-2">{item.title}</h3>
                  <div className="text-md md:text-lg text-slate-200 mt-2 md:mt-4 line-clamp-3">
                    {item.shortDescription}
                  </div>
                </div>
              </button>
            </Fancybox>
          </div>
        ))}
      </Carousel>

      <div className="flex items-center justify-end gap-8 mt-24 md:mt-32">
        <div className={clsx(items.length < 2 && 'hidden', items.length <= 3 && 'md:hidden')}>
          <CarouselControls
            canScrollNext={canScrollNext}
            canScrollPrev={canScrollPrev}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
        <NewsItemModal />
      </div>
    </div>
  );
};

const NewsItemModal = () => {
  const item = useUnit($$newsSection.$itemDetails);
  const isLoading = useUnit($$newsSection.$isItemDetailsLoading);

  return (
    <div
      id={NEWS_ITEM_MODAL_ID}
      style={{ display: 'none' }}
      data-selectable="true"
      className="w-[800px] max-w-full text-white bg-dark-500"
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-[25rem]">
          <SvgLoader />
        </div>
      ) : (
        item !== null && (
          <>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src={item.mainImg}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
                loading="lazy"
              />

              {item.mainImg ? (
                <img
                  src={item.mainImg}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt=""
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-500 text-sm font-semibold text-slate-300">
                  DILAN MIRROR
                </div>
              )}
            </div>
            <div className="mt-20 md:mt-32">
              <div className="flex flex-col sm:flex-row items-start sm:justify-between sm:items-center">
                <h3 className="text-xl md:text-2xl">{item.title}</h3>
                <div className="inline-block text-sm font-bold sm:text-right shrink-0 mt-12 sm:mt-0 sm:ml-20 bg-black/30 p-6">
                  {item.publishedDate}
                </div>
              </div>
              <article
                className="prose prose-invert md:prose-lg text-slate-200 prose-a:text-primary prose-a:no-underline prose-a:border-b prose-a:border-b-current prose-a:hover:border-b-2 mt-20 md:mt-32"
                dangerouslySetInnerHTML={{ __html: xss(item.content ?? '') }}
              />
            </div>
          </>
        )
      )}
    </div>
  );
};

const SvgLoader = () => (
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
);

export { NewsSection };
