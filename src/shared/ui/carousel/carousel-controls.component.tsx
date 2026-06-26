import { Icon } from '../icon';

interface CarouselControlsProps {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
}
const CarouselControls = ({
  canScrollPrev,
  canScrollNext,
  onPrev,
  onNext,
}: CarouselControlsProps) => {
  return (
    <>
      <button
        type="button"
        className="w-88 p-11 border border-dark hover:border-black bg-dark-900 active:bg-black [&[disabled]]:text-dark-200 [&[disabled]]:bg-dark-700"
        disabled={!canScrollPrev}
        onClick={() => onPrev()}
        tabIndex={canScrollPrev ? 0 : -1}
      >
        <Icon name="chevron-left" className="text-2xl" />
      </button>
      <button
        type="button"
        className="w-88 p-11 border border-dark hover:border-black bg-dark-900 active:bg-black [&[disabled]]:text-dark-200 [&[disabled]]:bg-dark-700"
        disabled={!canScrollNext}
        onClick={() => onNext()}
        tabIndex={canScrollNext ? 0 : -1}
      >
        <Icon name="chevron-right" className="text-2xl" />
      </button>
    </>
  );
};

export type { CarouselControlsProps };
export { CarouselControls };
