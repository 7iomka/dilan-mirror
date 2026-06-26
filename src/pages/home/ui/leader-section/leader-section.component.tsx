import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { memo, useLayoutEffect, useRef } from 'react';
import { Button } from '@/shared/ui/button';
import { Flag } from '@/shared/ui/flag';
import type { IconName } from '@/shared/ui/icon';
import { Icon } from '@/shared/ui/icon';
import { breakpointsClean } from '@/shared/config/theme';
import type { LeaderSocialDto, SocialType } from './leader-section.model';
import { $$leaderSection } from './leader-section.model';
import styles from './leader-section.module.css';

interface LeaderSectionProps {
  className?: string;
}

const LeaderSection = ({ className }: LeaderSectionProps) => {
  const { t } = useTranslation();

  const data = {
    title: t('leader.title', 'Representatives'),
  };

  return (
    <section id="leader" className={clsx('py-56 md:py-88 bg-dark-600', className)}>
      <div className="container">
        <div className="text-center">
          <h2 className="text-40px md:text-56px pt-5">{data.title}</h2>
        </div>

        <LeaderMembersNav />
        <LeaderMembersByContinent className="mt-30" />
      </div>
    </section>
  );
};
export const LeaderMembersNav = memo(() => {
  const { t } = useTranslation();
  const availableCountryContinents = useUnit($$leaderSection.$availableContinents);
  const activeContinent = useUnit($$leaderSection.$activeContinent);
  const onChangeActiveContinent = useUnit($$leaderSection.activeContinentChanged);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Centers the specified tab within the horizontal scroll container
  const centerContinentTab = (continentName: string, opts?: { smooth?: boolean }) => {
    const container = scrollerRef.current;
    const el = itemRefs.current[continentName];
    if (!container || !el) return;

    // Calculate the position so that the tab is centered in the container
    const elLeft = el.offsetLeft;
    const elWidth = el.offsetWidth;
    const containerWidth = container.clientWidth;

    let targetLeft = elLeft - (containerWidth - elWidth) / 2;

    // Protect against going out of bounds
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (targetLeft < 0) targetLeft = 0;
    if (targetLeft > maxScroll) targetLeft = maxScroll;

    container.scrollTo({
      left: targetLeft,
      behavior: opts?.smooth ? 'smooth' : ('auto' as ScrollBehavior),
    });
  };

  // On click: change the active continent and center its tab (horizontally)
  const handleChangeActiveContinent = (continentName: string) => {
    onChangeActiveContinent(continentName);
    // Wait for the next frame to ensure the ref and sizes are up to date
    requestAnimationFrame(() => centerContinentTab(continentName, { smooth: true }));
  };

  // On first mount: if the active continent is outside the visible area,
  // smoothly scroll to the top of the container (the page does not scroll)
  const didInit = useRef(false);
  useLayoutEffect(() => {
    if (didInit.current) return;
    // Wait for the buttons to be rendered and measured
    requestAnimationFrame(() => {
      if (activeContinent) centerContinentTab(activeContinent, { smooth: false });
      didInit.current = true;
    });
  }, [activeContinent, availableCountryContinents.length]);

  return (
    <div
      ref={scrollerRef}
      style={
        {
          '--p': `calc((100vw - (calc(var(--container-max-width) - var(--container-gutter) * 2))) / 2)`,
        } as any
      }
      className="flex lg:justify-center gap-[15px] lg:gap-x-[30px]
        overflow-x-auto lg:overflow-hidden no-scrollbar -mx-[--p] lg:mx-0
        before:w-[calc(var(--p)-15px)] before:shrink-0 after:w-[calc(var(--p)-15px)] after:shrink-0
        lg:before:hidden lg:after:hidden scroll-smooth snap-x snap-mandatory
        lg:snap-none scroll-px-5 lg:scroll-px-0 mt-56 scrollbar-none"
    >
      {availableCountryContinents.map((continentName) => (
        <Button
          ref={(el) => {
            itemRefs.current[continentName] = el;
          }}
          key={continentName}
          color={continentName === activeContinent ? 'primary-static' : 'dark'}
          className="text-xl gro lg:grow-[0.3] shrink-0 snap-center lg:snap-none"
          onClick={() => handleChangeActiveContinent(continentName)}
        >
          {t(`continent.${continentName}`, continentName)}
        </Button>
      ))}
    </div>
  );
});

const LeaderMembersByContinent = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const members = useUnit($$leaderSection.$listByContinent);

  return members.length > 0 ? (
    <SwiperReact
      id="leader-carousel-by-country"
      slidesPerView={2}
      slidesPerGroup={2}
      breakpoints={{
        [breakpointsClean.min]: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        [breakpointsClean.sm]: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        [breakpointsClean.lg]: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        [breakpointsClean.xl]: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }}
      spaceBetween={15}
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
      watchOverflow
      watchSlidesProgress
      centerInsufficientSlides
      simulateTouch={false}
      className={clsx(styles.carousel, className)}
    >
      {members
        .reduce((acc, current, index) => {
          const chunkIndex = Math.floor(index / 2);
          if (!acc[chunkIndex]) acc[chunkIndex] = [];

          acc[chunkIndex].push(
            <LeaderPerson
              key={current.id}
              userId={current.id}
              className="w-full bg-dark-600 py-30 px-15"
              country={current.country}
              region={current.region}
              fullName={current.fullName}
              image={current.photo}
              socials={current.links}
            />,
          );

          return acc;
        }, [] as any[])
        .map((group, index) => (
          <SwiperSlide key={index} className="w-auto h-auto">
            <div
              className={clsx('flex flex-wrap justify-center gap-5', group.length > 1 && 'h-full')}
            >
              {group}
            </div>
          </SwiperSlide>
        ))}
    </SwiperReact>
  ) : (
    <div
      className={clsx(
        'border border-3 border-dark-400 min-h-[600px] flex items-center justify-center',
        className,
      )}
    >
      <p className="text-center text-xl">{t('leader.comingSoon')}</p>
    </div>
  );
};

const LeaderPerson = ({
  className,
  userId,
  fullName,
  country,
  region,
  image,
  socials,
}: {
  className?: string;
  userId: number;
  fullName: string;
  country: string;
  region?: string;
  image: string;
  socials?: LeaderSocialDto[];
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('relative', className)}>
      <div className="absolute right-0 top-0 inline-block px-10 py-5 bg-dark-400 text-sm">
        id: <span className="text-primary-dark">{userId}</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <LeaderFace
          className="w-[180px] h-[180px]"
          fullName={fullName}
          image={image}
          country={country}
        />
        <div className="mt-16">
          <h4 className="text-xl leading-1">{fullName.trim()}</h4>
          <div className="text-lg mt-4">
            {region ? (
              <span className="text-sm font-normal">
                {region}, {t(`country.${country.toLowerCase()}`, '')}
              </span>
            ) : (
              <span>{t(`country.${country.toLowerCase()}`, '')}</span>
            )}
          </div>
        </div>
        {!!socials && socials.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-center sm:justify-end flex-wrap -mr-6 -mb-6">
              {socials.map(({ type, url }) => (
                <div className="mr-6 mb-6" key={type}>
                  <LeaderSocial type={type} url={url} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LeaderFace = ({
  className,
  fullName,
  country,
  image,
}: {
  className?: string;
  fullName: string;
  country: string;
  image: string;
}) => {
  return (
    <div className={clsx('relative inline-block', className)}>
      <img
        className="w-full h-full rounded-full object-cover object-top"
        src={image}
        alt={fullName}
        loading="lazy"
      />
      <Flag
        code={country.toLocaleLowerCase()}
        className="absolute w-[28%] right-0 bottom-0 h-auto"
      />
    </div>
  );
};

const LeaderSocial = ({
  className,
  type,
  url,
}: {
  className?: string;
  type: SocialType;
  url: string;
}) => {
  return (
    <a
      className={clsx(
        'flex items-center justify-center shrink-0 w-40 h-40 border border-dark-800 hover:border-dark-700 bg-dark-700 hover:bg-dark-600 text-white',
        className,
      )}
      aria-label={type}
      title={type}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon
        className={clsx('w-[50%] h-[50%] shrink-0')}
        name={type.toLocaleLowerCase() as IconName}
      />
    </a>
  );
};

export type { LeaderSectionProps };
export { LeaderSection };
