/* eslint-disable no-return-assign */
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import { Icon, type IconProps } from '@/shared/ui/icon';
import styles from './how-it-works-section.module.css';

const IMAGE_VERSION = 202407170126; // cache handler
interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection = ({ className }: HowItWorksSectionProps) => {
  const { t } = useTranslation();
  const data = {
    title: t('howItWorks.title'),
    accessories: [
      {
        id: 'intelligentLight',
        title: t('howItWorks.accessories.intelligentLight'),
        image: '/static/images/content/how-it-works-section/detail/intelligent-light.png',
        coordinates: { left: '42.5%', top: '0.8%' },
        coordinatesMobile: { left: '18.4%', top: '4.1%' },
        className: 'max-md:[grid-column:span_3]',
      },
      {
        id: 'motionSensor',
        title: t('howItWorks.accessories.motionSensor'),
        image: '/static/images/content/how-it-works-section/detail/motion-sensor.png',
        coordinates: { right: '20.1%', top: '6.2%' },
        coordinatesMobile: { right: '2%', top: '8.1%' },
      },
      {
        id: 'cuttOffSensor',
        title: t('howItWorks.accessories.cutOffSensor'),
        image: '/static/images/content/how-it-works-section/detail/cut-off-sensor.png',
        coordinates: { left: '66.7%', top: '5.4%' },
        coordinatesMobile: { right: '24.4%', top: '9.1%' },
      },
      {
        id: 'touchPanel',
        title: t('howItWorks.accessories.touchPanel'),
        image: '/static/images/content/how-it-works-section/detail/touch-panel.png',
        coordinates: { right: '20.6%', top: '37.8%' },
        coordinatesMobile: { right: '2%', top: '39.4%' },
      },
      {
        id: 'mirrorDisplay',
        title: t('howItWorks.accessories.mirrorDisplay'),
        image: '/static/images/content/how-it-works-section/detail/mirror-display.jpg',
        coordinates: { right: '25.4%', top: '61.6%' },
        coordinatesMobile: { right: '12.5%', top: '64.5%' },
      },
      {
        id: 'flap',
        title: t('howItWorks.accessories.flap'),
        image: '/static/images/content/how-it-works-section/detail/flap.png',
        coordinates: { left: '2.3%', bottom: '22.6%' },
        coordinatesMobile: { left: '5.8%', top: '57.1%' },
      },
      {
        id: 'camera',
        title: t('howItWorks.accessories.camera'),
        image: '/static/images/content/how-it-works-section/detail/camera.png',
        coordinates: { left: '0.1%', bottom: '21.4%' },
        coordinatesMobile: { left: '0.2%', top: '58.5%' },
      },
      {
        id: 'voiceSpeaker',
        title: t('howItWorks.accessories.voiceSpeaker', 'Voice speaker'),
        image: '/static/images/content/how-it-works-section/detail/voice-speaker.png',
        coordinates: { right: '21%', bottom: '40%' },
        coordinatesMobile: { right: '3%', bottom: '40.3%' },
      },
    ],
    items: [
      {
        iconName: 'play-circle',
        text: t('howItWorks.items.item1Text'),
      },
      {
        iconName: 'webcam',
        text: t('howItWorks.items.item2Text'),
      },
      {
        iconName: 'camera',
        text: t('howItWorks.items.item3Text'),
      },
      {
        iconName: 'layout-left',
        text: t('howItWorks.items.item4Text'),
      },
      {
        iconName: 'alarm-warning',
        text: t('howItWorks.items.item5Text'),
      },
      {
        iconName: '4k',
        text: t('howItWorks.items.item6Text'),
      },
    ] as { iconName: IconProps['name']; text: string }[],
  };

  const [activeAccessoryId, setActiveAccessoryId] = useState<string | null>(null!);

  const accessoriesRefs = useRef({});
  const tooltipData = useRef<{ image: string; title: string } | null>(null);
  const tooltipRef = useRef<HTMLElement | null>(null);
  const tooltipTimerRef = useRef<any>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handlePointClick = (id) => {
    setActiveAccessoryId(id);
    const accessory = data.accessories.find((acc) => acc.id === id)!;
    tooltipData.current = {
      title: accessory.title,
      image: accessory.image,
    };
    setIsTooltipOpen(true);
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
  };

  useEffect(() => {
    data.accessories.forEach((acc) => {
      accessoriesRefs.current[acc.id] = null;
    });

    setActiveAccessoryId(data.accessories[0].id);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isTooltipOpen && tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsTooltipOpen(false);
      }
    };

    if (isTooltipOpen) {
      tooltipTimerRef.current = setTimeout(() => {
        setIsTooltipOpen(false);
      }, 5000);
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isTooltipOpen]);

  return (
    <section
      id="how-it-works"
      className={clsx('py-56 md:py-88 bg-indigo-50 text-dark-800', className)}
    >
      <div className="container">
        <h2 className="text-40px md:text-56px whitespace-pre-wrap text-center">{data.title}</h2>
      </div>
      <div className="mt-24 lg:mt-56 overflow-hidden">
        <div className="container">
          <div className="relative md:hidden">
            <img
              src={`/static/images/content/how-it-works-section/scene-mobile-video.jpg?v=${IMAGE_VERSION}`}
              className={clsx('max-w-full z-[1]')}
              alt=""
              loading="lazy"
            />
            <img
              src={`/static/images/content/how-it-works-section/scene-mobile-mirror.jpg?v=${IMAGE_VERSION}`}
              className={clsx(styles.fadeImage, 'absolute left-0 top-0 right-0 w-full z-[2]')}
              alt=""
              loading="lazy"
            />
            <div className="absolute inset-0 z-[10] bg-dark-700/10">
              {data.accessories.map(({ id, coordinatesMobile }) => (
                <button
                  key={id}
                  type="button"
                  className={clsx(
                    styles.pointer,
                    activeAccessoryId === id && styles.pointerActive,
                    'w-15 h-15 absolute rounded-full',
                    activeAccessoryId === id ? 'text-primary-light' : 'text-white',
                  )}
                  style={Object.keys(coordinatesMobile).reduce((acc, key) => {
                    if (coordinatesMobile[key] === undefined) return acc;

                    acc[key] = coordinatesMobile[key];
                    return acc;
                  }, {})}
                  onClick={() => handlePointClick(id)}
                  ref={(el) => (accessoriesRefs.current[id] = el)}
                >
                  <svg
                    className="w-full h-full [&_circle]:transition-opacity"
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2" />
                    <circle
                      cx="6"
                      cy="6"
                      r="2"
                      fill="currentColor"
                      opacity={activeAccessoryId === id ? 1 : 0}
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <img
              src={`/static/images/content/how-it-works-section/scene-desktop-video.jpg?v=${IMAGE_VERSION}`}
              className={clsx('max-w-full z-[1]')}
              alt=""
              loading="lazy"
            />
            <img
              src={`/static/images/content/how-it-works-section/scene-desktop-mirror.jpg?v=${IMAGE_VERSION}`}
              className={clsx(styles.fadeImage, 'absolute left-0 top-0 right-0 w-full z-[2]')}
              alt=""
              loading="lazy"
            />

            <div className="absolute inset-0 z-[10]">
              {data.accessories.map(({ id, coordinates }) => (
                <button
                  key={id}
                  type="button"
                  className={clsx(
                    styles.pointer,
                    activeAccessoryId === id && styles.pointerActive,
                    'w-24 h-24 absolute rounded-full',
                    activeAccessoryId === id ? 'text-primary-light' : 'text-white',
                  )}
                  style={{
                    ...Object.keys(coordinates).reduce((acc, key) => {
                      if (coordinates[key] === undefined) return acc;

                      acc[key] = coordinates[key];
                      return acc;
                    }, {}),
                  }}
                  onClick={() => handlePointClick(id)}
                  ref={(el) => (accessoriesRefs.current[id] = el)}
                >
                  <svg
                    className="w-full h-full [&_circle]:transition-opacity"
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2" />
                    <circle
                      cx="6"
                      cy="6"
                      r="2"
                      fill="currentColor"
                      opacity={activeAccessoryId === id ? 1 : 0}
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 md:mt-40">
        <div className="container">
          <div className="row gy-16 md:gy-32">
            {data.items.map(({ iconName, text }) => (
              <div className="col-12 md:col-4" key={iconName}>
                <div className="flex">
                  <Icon name={iconName} className="text-xl" />
                  <div className="ml-12 md:20">
                    <div className="text-sm">{text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isTooltipOpen && !!activeAccessoryId && (
        <Tooltip
          referenceElement={accessoriesRefs.current[activeAccessoryId]}
          content={tooltipData.current ? <PointTooltipContent {...tooltipData.current} /> : null}
          tooltipRef={tooltipRef}
        />
      )}
    </section>
  );
};

const Tooltip = ({
  referenceElement,
  content,
  tooltipRef,
}: {
  referenceElement: HTMLElement | null;
  content: ReactNode;
  tooltipRef: React.MutableRefObject<HTMLElement | null>;
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    strategy: 'fixed',
  });

  return createPortal(
    referenceElement && content ? (
      <div
        className="z-[999] pointer-events-none max-md:!bottom-0 max-md:!left-0 max-md:!right-0 max-md:!top-auto"
        ref={(el) => {
          tooltipRef.current = el;
          setPopperElement(el);
        }}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        {content}
        <div ref={setArrowElement} style={popperStyles.arrow} />
      </div>
    ) : null,
    document.body,
  );
};

const PointTooltipContent = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="text-center">
      <div className="bg-dark py-10 px-16">
        <img className="w-100 h-100 mx-auto object-contain shrink-0" src={image} alt="" />
      </div>
      <h3 className="py-10 px-16 bg-dark-light text-md text-white">{title}</h3>
    </div>
  );
};

export type { HowItWorksSectionProps };
export { HowItWorksSection };
