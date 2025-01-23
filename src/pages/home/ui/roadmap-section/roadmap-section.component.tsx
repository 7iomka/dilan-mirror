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
        title: t('roadmap.textFor22_23'),
        completed: true,
      },
      {
        period: '2024 - 2026',
        title: t('roadmap.textFor24_26'),
        // inProgress: true,
      },
      {
        period: '2025 - 2026',
        title: t('roadmap.textFor25_26'),
      },
      {
        period: '2027',
        title: t('roadmap.textFor26'),
        hasIPOLabelAfter: true,
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
        <div className="overflow-hidden mt-30 md:mt-50">
          <div className="overflow-x-auto overflow-y-hidden scroll-smooth c-hide-native-scrollbar">
            <div className="container pt-40 pb-20">
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
                  {data.items.map(({ period, title, completed, hasIPOLabelAfter }) => (
                    // 20.25rem is 54px (patter width) * 6
                    <div
                      key={period}
                      className={clsx(
                        'shrink-0 w-240 xl:w-280 lp:w-[20.25rem]',
                        !hasIPOLabelAfter && 'pr-24',
                      )}
                    >
                      <div className={clsx('relative', completed && 'text-primary')}>
                        {hasIPOLabelAfter && (
                          <div className="absolute right-0 bottom-full md:-mb-6 lg:mb-4 lp:mb-10 w-70 h-70 z-[2] flex items-center justify-center">
                            <svg
                              className="absolute inset-0 text-white w-full h-full"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#sch_filled_sq)">
                                <path
                                  d="M12 0L21.13 1.992C21.3767 2.04585 21.5974 2.18069 21.7556 2.37426C21.9137 2.56783 22 2.80856 22 3.05673V13.9516C21.9999 15.0292 21.7289 16.09 21.211 17.04C20.6931 17.99 19.9443 18.7998 19.0311 19.3975L12 24L4.96889 19.3975C4.05572 18.8 3.30693 17.9905 2.78901 17.0406C2.27109 16.0908 2.00007 15.0301 2 13.9527V3.05673C2.00004 2.80856 2.08626 2.56783 2.24443 2.37426C2.4026 2.18069 2.62326 2.04585 2.87 1.992L12 0Z"
                                  fill="currentColor"
                                />
                              </g>
                              <defs>
                                <clipPath id="sch_filled_sq">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <span className="relative z-10 text-primary-pale text-xl font-bold">
                              IPO
                            </span>
                          </div>
                        )}
                        <div className="absolute left-0 bottom-full mb-24 lg:mb-36 w-5 h-20 lp:w-8 lp:h-32 bg-white z-[2]" />
                        <div
                          className={clsx(
                            'text-xl font-bold flex items-center',
                            hasIPOLabelAfter && 'pr-24',
                          )}
                        >
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
