import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import {
  $$committee,
  CommitteeFace,
  CommitteePerson,
  getCommitteeFullName,
} from '@/entities/committee';
import { Fancybox } from '@/shared/ui/fancybox';
import { Dropdown } from '@/shared/ui/dropdown';
import { Button } from '@/shared/ui/button';
import { Flag } from '@/shared/ui/flag';
import { Icon } from '@/shared/ui/icon';
import { breakpointsClean } from '@/shared/config/theme';
import { COMMITTEE_MEMBER_MODAL_ID } from './committee-section.lib';
import { $$committeeSection } from './committee-section.model';
import 'swiper/css/pagination';
import styles from './committe-section.module.css';

interface CommitteeSectionProps {
  className?: string;
}

const CommitteeSection = ({ className }: CommitteeSectionProps) => {
  const { t } = useTranslation();

  const data = {
    title: t('committee.title', 'Supervisory committee'),
  };

  return (
    <section id="committee" className={clsx('py-56 md:py-88 bg-dark-900/30', className)}>
      <div className="container">
        <div className="text-center">
          <h2 className="text-40px md:text-56px pt-5">{data.title}</h2>
        </div>

        <CommitteeCarousel className="mt-30" />
        <CommitteeMembersByCountrySelect className="mt-56" />
        <CommitteeMembersByCountry className="mt-30" />
        <CommitteeDetailsModal />
      </div>
    </section>
  );
};

const CommitteeCarousel = ({ className }: { className?: string }) => {
  const handleOpenMemberDetails = useUnit($$committeeSection.openDetailsByIdTriggered);
  const members = useUnit($$committee.$listWithPreferencesByCountryMD);

  return (
    <div className={clsx(className)}>
      <Fancybox
        options={{
          autoFocus: false,
        }}
      >
        <div className="overflow-hidden">
          <div className="overflow-x-auto overflow-y-hidden scroll-smooth c-hide-native-scrollbar">
            <div className="grid gap-x-12 md:gap-x-24 gap-y-20 [grid-template-columns:repeat(auto-fill,minmax(5.5rem,1fr))] min-w-[43.5rem]">
              {members.map(({ id, country, name, surname, photo, photoPreview }) => (
                <button
                  key={id}
                  type="button"
                  className="w-100 h-100 p-6 hover:bg-primary-pale/50 rounded-full"
                  onClick={() => handleOpenMemberDetails(id)}
                >
                  <CommitteeFace
                    className="w-full h-full"
                    country={country}
                    fullName={getCommitteeFullName({ name, surname })}
                    image={photoPreview || photo}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Fancybox>
    </div>
  );
};

const CommitteeDetailsModal = () => {
  const item = useUnit($$committeeSection.$activeItem);

  return (
    <div
      id={COMMITTEE_MEMBER_MODAL_ID}
      style={{ display: 'none' }}
      className="w-[24rem] max-w-full text-white bg-dark-500 sm:pr-40"
    >
      {item !== null && (
        <CommitteePerson
          country={item.country}
          fullName={getCommitteeFullName({ name: item.name, surname: item.surname })}
          image={item.photoPreview || item.photo}
          imageSize="xl"
          socials={item.links}
        />
      )}
    </div>
  );
};

const CommitteeMembersByCountrySelect = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  const availableCountryCodes = useUnit($$committeeSection.$availableCountryCodes);
  const activeCountryCode = useUnit($$committeeSection.$activeCountryCode);

  const handleChangeActiveCountryCode = useUnit($$committeeSection.activeCountryCodeChanged);

  return (
    <div className={clsx(className)}>
      <h3 className="text-center text-xl md:text-2xl">
        {t('committee.select.title', 'Select by country')}
      </h3>
      <div className={clsx('max-w-[32rem] mx-auto mt-30')}>
        <Dropdown
          classNames={{
            arrow: 'fill-dark',
          }}
          options={{
            placement: 'bottom',
            autoWidth: false,
            arrow: false,
          }}
          trigger={
            <Button
              color="custom"
              size="custom"
              className="border border-dark-400  bg-dark-600 hover:bg-dark-500 text-white h-50 px-10 w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {activeCountryCode !== null && (
                    <Flag code={activeCountryCode} className="text-md w-[1em] h-[1em] shrink-0" />
                  )}
                  <span className={clsx('text-md leading-1', activeCountryCode !== null && 'ml-5')}>
                    {activeCountryCode !== null
                      ? t(`country.${activeCountryCode}`)
                      : t('committee.select.placeholderWhenIsEmpty', 'Name of the country')}
                  </span>
                </div>
                <Icon name="chevron-right" className="ml-5" />
              </div>
            </Button>
          }
        >
          {({ close }) => (
            <div className="flex flex-col w-[calc((var(--container-max-width)_-_var(--container-gutter)*2))] sm:w-[32rem] max-w-full bg-dark max-h-[420px] overflow-y-auto">
              <Button
                color="custom"
                className={clsx(
                  'bg-dark text-white',
                  activeCountryCode === null ? 'bg-primary/[0.15]' : 'hover:bg-primary/[0.08]',
                )}
                onClick={() => {
                  handleChangeActiveCountryCode(null);
                  close();
                }}
              >
                {t('committee.select.placeholderWhenIsEmpty', 'Name of the country')}
              </Button>
              {availableCountryCodes.map((code) => (
                <Button
                  key={code}
                  color="custom"
                  className={clsx(
                    'bg-dark text-white',
                    code === activeCountryCode ? 'bg-primary/[0.15]' : 'hover:bg-primary/[0.08]',
                  )}
                  onClick={() => {
                    handleChangeActiveCountryCode(code);
                    close();
                  }}
                >
                  <div className={clsx('flex items-center')}>
                    <Flag code={code} className="text-md w-[1em] h-[1em] shrink-0" />
                    <span className="ml-5 text-md">{t(`country.${code}`)}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

const CommitteeMembersByCountry = ({ className }: { className?: string }) => {
  const members = useUnit($$committeeSection.$listByCountryCode);

  return members.length > 0 ? (
    <SwiperReact
      id="committee-carousel-by-country"
      slidesPerView={4}
      breakpoints={{
        [breakpointsClean.min]: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        [breakpointsClean.sm]: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        [breakpointsClean.lg]: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        [breakpointsClean.xl]: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      }}
      spaceBetween={0}
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
      watchOverflow
      watchSlidesProgress
      centerInsufficientSlides
      className={clsx(styles.carousel, 'mt-20')}
    >
      {members.map(({ id, country, name, surname, photo, photoPreview, links }) => (
        <SwiperSlide key={id} className="w-auto">
          <div className="p-3">
            <CommitteePerson
              key={id}
              className="w-full h-full bg-dark-600 py-30 px-15"
              country={country}
              fullName={getCommitteeFullName({ name, surname })}
              image={photoPreview || photo}
              socials={links}
            />
          </div>
        </SwiperSlide>
      ))}
    </SwiperReact>
  ) : null;
};

export type { CommitteeSectionProps };
export { CommitteeSection };
