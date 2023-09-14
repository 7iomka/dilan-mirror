import { Button } from '../button';
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
      <Button
        color="custom"
        size="custom"
        className="p-11 border border-dark hover:border-black bg-dark-800 hover:bg-black w-88 [&[disabled]]:text-dark-200"
        disabled={!canScrollPrev}
        onClick={() => onPrev()}
        tabIndex={canScrollPrev ? 0 : -1}
      >
        <Icon name="chevron-left" className="text-2xl" />
      </Button>
      <Button
        color="custom"
        className="p-11 border border-dark hover:border-black bg-dark-800 hover:bg-black w-88 [&[disabled]]:text-dark-200"
        disabled={!canScrollNext}
        onClick={() => onNext()}
        tabIndex={canScrollNext ? 0 : -1}
      >
        <Icon name="chevron-right" className="text-2xl" />
      </Button>
    </>
  );
};

export type { CarouselControlsProps };
export { CarouselControls };
