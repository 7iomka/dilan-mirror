/* eslint-disable react-hooks/exhaustive-deps */
import type { PropsWithChildren } from 'react';
import { Children, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import type { ClassNamesType } from 'embla-carousel-class-names';
import ClassNames from 'embla-carousel-class-names';
import type { AutoHeightType } from 'embla-carousel-auto-height';
import AutoHeight from 'embla-carousel-auto-height';
import type { AutoplayOptionsType } from 'embla-carousel-autoplay';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { CarouselControls } from './carousel-controls.component';
import { clamp } from './carousel.lib';

interface CarouselProps extends PropsWithChildren {
  className?: string;
  classNames?: {
    root?: string;
    viewport?: string;
    container?: string;
    indicators?: string;
    indicator?: string;
  };
  options?: EmblaOptionsType;
  /** Get embla API as ref */
  getEmblaApi?(embla: EmblaCarouselType): void;
  /** Called when next slide is shown */
  onNextSlide?(): void;
  /** Called when previous slider is shown */
  onPreviousSlide?(): void;
  /** Called with slide index when slide changes */
  onSlideChange?(index: number): void;
  /** Determines whether arrow key should switch slides, `true` by default */
  withKeyboardEvents?: boolean;
  withControls?: boolean;
  withIndicators?: boolean;
  viewportOverflow?: 'hidden' | 'visible';
  plugins?: (
    | { name: 'Autoplay'; options?: AutoplayOptionsType }
    | { name: 'AutoHeight'; options?: AutoHeightType }
    | { name: 'ClassNames'; options?: ClassNamesType }
  )[];
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, ref) => {
  const {
    options,
    className,
    children,
    withControls,
    viewportOverflow = 'hidden',
    plugins,
    getEmblaApi,
    onNextSlide,
    onPreviousSlide,
    onSlideChange,
    classNames,
    withIndicators,
    withKeyboardEvents = true,
  } = props;

  const pluginsRef = useRef<EmblaPluginType[]>(
    (() => {
      const pluginList: Record<string, (pluginOptions: any) => EmblaPluginType> = {
        Autoplay: (pluginOptions) => Autoplay(pluginOptions),
        ClassNames: (pluginOptions) => ClassNames(pluginOptions),
        AutoHeight: (pluginOptions) => AutoHeight(pluginOptions),
      };

      return (
        plugins?.map(({ name: pluginName, options: pluginOptions }) =>
          pluginList[pluginName](pluginOptions),
        ) || []
      );
    })(),
  );

  const [emblaRefElement, embla] = useEmblaCarousel(options, pluginsRef.current);

  const hasAutoHeight = !!plugins?.find((pl) => pl.name === 'AutoHeight');

  const [selected, setSelected] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  const handleScroll = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const handleSelect = useCallback(() => {
    if (!embla) return;
    const slide = embla.selectedScrollSnap();
    setSelected(slide);
    onSlideChange?.(slide);

    embla.plugins().autoplay?.reset();
  }, [embla, setSelected]);

  const handleAutoplayRules = useCallback(() => {
    if (!embla) return;
    const { autoplay } = embla.plugins();
    autoplay?.reset();
    if (autoplay?.options.stopOnInteraction !== false) autoplay?.stop();
  }, [embla]);

  const handlePrevious = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    onPreviousSlide?.();
    handleAutoplayRules();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    onNextSlide?.();
    handleAutoplayRules();
  }, [embla]);

  const handleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (withKeyboardEvents) {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          handleNext();
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          handlePrevious();
        }
      }
    },
    [embla],
  );

  const indicators = Array(slidesCount)
    .fill(0)
    .map((_, index) => (
      <button
        type="button"
        className={clsx('c-carousel-indicator', classNames?.indicator)}
        key={index}
        data-active={index === selected || undefined}
        aria-hidden
        tabIndex={-1}
        onClick={() => handleScroll(index)}
      />
    ));

  useEffect(() => {
    if (!embla) return undefined;

    getEmblaApi?.(embla);
    handleSelect();
    setSlidesCount(embla.scrollSnapList().length);
    embla.on('select', handleSelect);
    embla.on('reInit', handleSelect);

    return () => {
      embla.off('select', handleSelect);
      embla.off('reInit', handleSelect);
    };
  }, [embla, onSlideChange, options?.slidesToScroll]);

  useEffect(() => {
    if (embla) {
      embla.reInit();
      setSlidesCount(embla.scrollSnapList().length);
      setSelected((currentSelected) =>
        clamp(currentSelected, 0, Children.toArray(children).length - 1),
      );
    }
  }, [Children.toArray(children).length, options?.slidesToScroll]);

  const canScrollPrev = embla?.canScrollPrev() || false;
  const canScrollNext = embla?.canScrollNext() || false;
  return (
    <div
      ref={ref}
      className={clsx(className, 'c-carousel', classNames?.root)}
      onKeyDownCapture={handleKeydown}
    >
      <div
        className={clsx(
          'c-carousel-viewport',
          classNames?.viewport,
          viewportOverflow === 'hidden' && 'overflow-hidden',
        )}
        ref={emblaRefElement}
      >
        <div
          className={clsx(
            'c-carousel-container',
            classNames?.container,
            'flex',
            hasAutoHeight && (options?.axis === 'y' ? 'justify-start' : 'items-start'),
            options?.axis === 'y' && 'flex-col',
          )}
        >
          {children}
        </div>
      </div>
      {withIndicators && (
        <div className={clsx('c-carousel-indicators', classNames?.indicators)}>{indicators}</div>
      )}
      {withControls && (
        <CarouselControls
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
          onNext={() => embla?.scrollNext()}
          onPrev={() => embla?.scrollPrev()}
        />
      )}
    </div>
  );
});

export type { CarouselProps };
export { Carousel };
