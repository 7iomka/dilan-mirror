import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import type { ClassNamesType } from 'embla-carousel-class-names';
import ClassNames from 'embla-carousel-class-names';
import type { AutoHeightType } from 'embla-carousel-auto-height';
import AutoHeight from 'embla-carousel-auto-height';
import type { AutoplayOptionsType } from 'embla-carousel-autoplay';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import type { PropsWithChildren } from 'react';
import { Children, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CarouselControls } from './carousel-controls.component';

interface CarouselProps extends PropsWithChildren {
  options?: EmblaOptionsType;
  className?: string;
  initialIndex?: number;
  withControls?: boolean;
  overflowVisible?: boolean;
  plugins?: (
    | { name: 'Autoplay'; options?: AutoplayOptionsType }
    | { name: 'AutoHeight'; options?: AutoHeightType }
    | { name: 'ClassNames'; options?: ClassNamesType }
  )[];
}

const Carousel = ({
  options,
  className,
  children,
  initialIndex,
  withControls,
  overflowVisible,
  plugins,
}: CarouselProps) => {
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

  const [emblaRef, emblaApi] = useEmblaCarousel(options, pluginsRef.current);

  const hasAutoHeight = !!plugins?.find((pl) => pl.name === 'AutoHeight');

  // need to selectedIndex to allow this component to re-render in react.
  // Since emblaRef is a ref, it won't re-render even if there are internal changes to its state.
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    function selectHandler() {
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on('select', selectHandler);
    // cleanup
    return () => {
      emblaApi?.off('select', selectHandler);
    };
  }, [emblaApi]);

  const length = Children.count(children);
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();
  return (
    <>
      <div className={clsx(!overflowVisible && 'overflow-hidden', className)} ref={emblaRef}>
        <div className={clsx('flex', hasAutoHeight && 'items-start')}>{children}</div>
      </div>
      {/* <Dots itemsLength={length} selectedIndex={selectedIndex} /> */}
      {withControls && (
        <CarouselControls
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
          onNext={() => emblaApi?.scrollNext()}
          onPrev={() => emblaApi?.scrollPrev()}
        />
      )}
    </>
  );
};
export type { CarouselProps };
export { Carousel };
