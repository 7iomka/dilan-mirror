import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';
import { Carousel, CarouselControls } from '@/shared/ui/carousel';
import styles from './example-section.module.css';

interface ExamplesSectionProps {
  className?: string;
}

const ExamplesSection = ({ className }: ExamplesSectionProps) => {
  const { t } = useTranslation();
  const data = {
    title: t('examples.title'),
    description: t('examples.description'),
    items: [
      {
        title: t('examples.clothingStores'),
        mirrorSrc:
          '/static/images/content/examples-section/clothing_stores/clothing_stores_mirror.jpg',
        videoSrc:
          '/static/images/content/examples-section/clothing_stores/clothing_stores_video.jpg',
      },
      {
        title: t('examples.fittingRooms'),
        mirrorSrc: '/static/images/content/examples-section/fitting_rooms/fitting_rooms_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/fitting_rooms/fitting_rooms_video.jpg',
      },
      {
        title: t('examples.dressingRooms'),
        mirrorSrc:
          '/static/images/content/examples-section/dressing_rooms/dressing_rooms_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/dressing_rooms/dressing_rooms_video.jpg',
      },
      {
        title: t('examples.homeUse'),
        mirrorSrc: '/static/images/content/examples-section/home_use/home_use_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/home_use/home_use_video.jpg',
      },
      {
        title: t('examples.tattooSalons'),
        mirrorSrc: '/static/images/content/examples-section/tattoo_salons/tattoo_salons_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/tattoo_salons/tattoo_salons_video.jpg',
      },
      {
        title: t('examples.hairdressers'),
        mirrorSrc: '/static/images/content/examples-section/hairdressers/hairdressers_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/hairdressers/hairdressers_video.jpg',
      },
      {
        title: t('examples.beautySalons'),
        mirrorSrc: '/static/images/content/examples-section/beauty_salons/beauty_salons_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/beauty_salons/beauty_salons_video.jpg',
      },
      {
        title: t('examples.barbershops'),
        mirrorSrc: '/static/images/content/examples-section/barbershops/barbershops_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/barbershops/barbershops_video.jpg',
      },
      {
        title: t('examples.dancingSchools'),
        mirrorSrc:
          '/static/images/content/examples-section/dancing_schools/dancing_schools_mirror.jpg',
        videoSrc:
          '/static/images/content/examples-section/dancing_schools/dancing_schools_video.jpg',
      },
      {
        title: t('examples.gyms'),
        mirrorSrc: '/static/images/content/examples-section/gyms/gyms_mirror.jpg',
        videoSrc: '/static/images/content/examples-section/gyms/gyms_video.jpg',
      },
      {
        title: t('examples.modelingAgencies'),
        mirrorSrc:
          '/static/images/content/examples-section/modeling_agencies/modeling_agencies_mirror.jpg',
        videoSrc:
          '/static/images/content/examples-section/modeling_agencies/modeling_agencies_video.jpg',
      },

      {
        title: t('examples.artistDressingRooms'),
        mirrorSrc:
          '/static/images/content/examples-section/artist_dressing_rooms/artist_dressing_rooms_mirror.jpg',
        videoSrc:
          '/static/images/content/examples-section/artist_dressing_rooms/artist_dressing_rooms_video.jpg',
      },
      {
        title: t('examples.medicalRehabilitationAndPhysiotherapy'),
        mirrorSrc:
          '/static/images/content/examples-section/medical_rehabilitation_and_physiotherapy/medical_rehabilitation_and_physiotherapy_mirror.jpg',
        videoSrc:
          '/static/images/content/examples-section/medical_rehabilitation_and_physiotherapy/medical_rehabilitation_and_physiotherapy_video.jpg',
      },
      {
        title: t('examples.gameEscapeAndParks'),
        mirrorSrc:
          '/static/images/content/examples-section/game_escape_and_parks/game_escape_and_parks_mirror.jpg',
        videoSrc:
          '/static/images/content/examples-section/game_escape_and_parks/game_escape_and_parks_video.jpg',
      },
    ],
  };

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
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
    if (!embla) return;

    onSelect();
    embla.on('reInit', onSelect);
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <section
      id="examples"
      className={clsx(
        `pt-56 md:pt-88
        bg-gradient-to-b from-dark-500 from-90% md:from-80%
        via-dark-500 via-90% md:via-80%
        to-indigo-50 to-90% md:to-80%
        overflow-hidden`,
        className,
      )}
    >
      <div className="container">
        <div className="row gy-12">
          <div className="col-12 md:col-6">
            <h2 className="text-40px md:text-56px whitespace-pre-wrap">{data.title}</h2>
          </div>
          <div className="col-12 md:col-6">
            <div className="text-xl md:text-2xl whitespace-pre-wrap">{data.description}</div>
            <div className="hidden md:flex items-center justify-end gap-8 mt-18">
              <CarouselControls
                canScrollNext={canScrollNext}
                canScrollPrev={canScrollPrev}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>
          </div>
        </div>
        <div className="mt-32 md:mt-56">
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
            {data.items.map((item, idx) => (
              <div className="relative flex-[0_0_20rem] xl:flex-[0_0_25%] pr-24" key={idx}>
                <div className="relative w-full h-0 pb-[calc(400*100%/296)] bg-dark-500">
                  <img
                    src={item.videoSrc}
                    className={clsx('absolute inset-0 w-full h-full object-cover')}
                    alt=""
                  />
                  <img
                    src={item.mirrorSrc}
                    className={clsx(
                      'absolute inset-0 w-full h-full object-cover',
                      styles.fadeImage,
                    )}
                    alt=""
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-[11.75rem] max-h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.72)_100%)]" />
                  <div className="absolute inset-0 z-[3] flex flex-col justify-end p-20">
                    <h3 className="text-xl w-full">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export type { ExamplesSectionProps };
export { ExamplesSection };
