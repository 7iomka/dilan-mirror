import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/icon';
import styles from './roadmap-section.module.css';

interface RoadmapSectionProps {
  className?: string;
}

const RoadmapSection = ({ className }: RoadmapSectionProps) => {
  const { t } = useTranslation();
  const data = {
    title: t('roadmap.title'),
    description: t('roadmap.description'),
    items: [
      {
        period: '2023',
        title: t('roadmap.textFor22-23'),
        completed: true,
      },
      {
        period: '2024 - 2026',
        title: t('roadmap.textFor23-24'),
        // inProgress: true,
      },
      {
        period: '2025 - 2026',
        title: t('roadmap.textFor24-25'),
      },
      {
        period: '2027',
        title: t('roadmap.textFor26'),
      },
    ],
  };

  // const scrollContainerEl = useRef<HTMLDivElement>(null);
  // const listEl = useRef<HTMLDivElement>(null);

  // const handleScrollLeft = useCallback(() => {
  //   if (!scrollContainerEl.current || !listEl.current) return;

  //   scrollContainerEl.current.scrollLeft =
  //     (listEl.current?.children[1] as HTMLDivElement)?.offsetLeft || 0;
  // }, [scrollContainerEl, listEl]);

  // useEffect(() => {
  //   handleScrollLeft();
  //   window.addEventListener('resize', handleScrollLeft);
  //   return () => {
  //     window.removeEventListener('resize', handleScrollLeft);
  //   };
  // }, [handleScrollLeft]);
  return (
    <section id="roadmap" className={clsx('py-56 md:py-88 bg-dark-500', className)}>
      <div className="container">
        <div className="row gy-12">
          <div className="col-12 md:col-6">
            <h2 className="text-40px md:text-56px whitespace-pre-wrap">{data.title}</h2>
          </div>
          <div className="col-12 md:col-6">
            <div className="text-xl md:text-2xl whitespace-pre-wrap">{data.description}</div>
          </div>
        </div>
      </div>
      <div className="mt-32 md:mt-56">
        <svg
          className="w-54 h-32 c-visually-hidden"
          viewBox="0 0 54 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="customPattern"
              width="54"
              height="32"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <path d="M13 16V32" className="stroke-primary-pale" strokeWidth="4" />
              <path d="M23 16V32" className="stroke-primary-pale" strokeWidth="4" />
              <path d="M34 16V32" className="stroke-primary-pale" strokeWidth="4" />
              <path d="M45 16V32" className="stroke-primary-pale" strokeWidth="4" />
              <path d="M2 0V32" className="stroke-primary-pale" strokeWidth="4" />
            </pattern>
          </defs>
        </svg>
        <svg
          className="w-40 h-20 c-visually-hidden"
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="customPatternMobile"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <path d="M2 0V20" className="stroke-primary-pale" strokeWidth="3" />
              <path d="M10 10V20" className="stroke-primary-pale" strokeWidth="3" />
              <path d="M18 10V20" className="stroke-primary-pale" strokeWidth="3" />
              <path d="M26 10V20" className="stroke-primary-pale" strokeWidth="3" />
              <path d="M34 10V20" className="stroke-primary-pale" strokeWidth="3" />
            </pattern>
          </defs>
        </svg>
        <div className="overflow-hidden mt-50">
          <div className="overflow-x-auto overflow-y-hidden scroll-smooth c-hide-native-scrollbar">
            <div className="container pb-11">
              <div className={clsx(styles.wrapper, 'relative w-[var(--w)] flex flex-col')}>
                <div className="relative">
                  {/* Left line */}
                  <div
                    className={clsx(
                      styles.leftLine,
                      'absolute right-full -mr-4 top-0 scale-x-[-1] w-full',
                    )}
                  >
                    <svg
                      className="w-full h-20 lp:hidden"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100%" height="100%" fill="url(#customPatternMobile)" />
                    </svg>
                    <svg
                      className="w-full h-32 hidden lp:block"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100%" height="100%" fill="url(#customPattern)" />
                    </svg>
                  </div>
                  {/* Main line */}
                  <div className={clsx(styles.mainLine, 'relative')}>
                    <svg
                      className="w-full h-20 lp:hidden"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100%" height="100%" fill="url(#customPatternMobile)" />
                    </svg>
                    <svg
                      className="w-full h-32 hidden lp:block"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100%" height="100%" fill="url(#customPattern)" />
                    </svg>
                  </div>
                  {/* Right line */}
                  <div className={clsx(styles.rightLine, 'absolute left-full top-0')}>
                    <svg
                      className="w-full h-20 lp:hidden"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100%" height="100%" fill="url(#customPatternMobile)" />
                    </svg>
                    <svg
                      className="w-full h-32 hidden lp:block"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100%" height="100%" fill="url(#customPattern)" />
                    </svg>
                  </div>
                </div>
                <div className="flex lg:items-stretch lg:order-0 mt-24 lg:mt-36">
                  {data.items.map(({ period, title, completed }) => (
                    // 20.25rem is 54px (patter width) * 6
                    <div key={period} className="shrink-0 w-240 xl:w-280 lp:w-[20.25rem] pr-24">
                      <div className={clsx('relative', completed && 'text-primary')}>
                        <div className="absolute left-0 bottom-full mb-24 lg:mb-36 w-5 h-20 lp:w-8 lp:h-32 bg-white z-[2]" />
                        <div className="text-xl font-bold flex items-center">
                          <span>{period}</span>
                          {/* {inProgress && (
                            <Icon name="time" className="c-icon text-primary-dark ml-[0.24em]" />
                          )} */}
                          {completed && (
                            <Icon name="shield-check" className="c-icon text-primary ml-[0.24em]" />
                          )}
                        </div>
                        <div className="mt-4 text-lg">{title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { RoadmapSectionProps };
export { RoadmapSection };
