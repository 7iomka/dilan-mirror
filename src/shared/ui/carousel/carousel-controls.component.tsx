import clsx from 'clsx';

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
    <div className="flex justify-end space-x-10">
      <button
        type="button"
        onClick={() => {
          if (canScrollPrev) {
            onPrev();
          }
        }}
        disabled={!canScrollPrev}
        className={clsx({
          'px-4 py-2 text-white rounded-md': true,
          'bg-indigo-200': !canScrollPrev,
          'bg-indigo-400': canScrollPrev,
        })}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          if (canScrollNext) {
            onNext();
          }
        }}
        disabled={!canScrollNext}
        className={clsx({
          'c-carousel-control px-4 py-2 text-white rounded-md': true,
          'bg-indigo-200': !canScrollNext,
          'bg-indigo-400': canScrollNext,
        })}
      >
        Next
      </button>
    </div>
  );
};

export type { CarouselControlsProps };
export { CarouselControls };
