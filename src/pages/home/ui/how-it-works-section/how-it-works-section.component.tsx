/* eslint-disable no-return-assign */
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import { Icon, type IconProps } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import styles from './how-it-works-section.module.css';

type PopperPlacement = 'top' | 'bottom' | 'left' | 'right';

interface Accessory {
  id: string;
  title: string;
  image: string;
  coordinates: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  coordinatesMobile: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  tooltipPlacement?: PopperPlacement;
  tooltipFallbackPlacements?: PopperPlacement[];
}

interface Item {
  iconName: IconProps['name'];
  text: string;
}

interface TabConfig {
  id: string;
  label: string;
  mobileVideoImage: string;
  mobileMirrorImage: string;
  desktopVideoImage: string;
  desktopMirrorImage: string;
  accessories: Accessory[];
}

interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection = ({ className }: HowItWorksSectionProps) => {
  const { t } = useTranslation();

  const tabs = useMemo<TabConfig[]>(
    () => [
      {
        id: 'demo_dressing_room',
        label: t('howItWorks.tabs.dressingRoom', 'Dressing Room'),
        mobileVideoImage: `/static/images/content/how-it-works-section/dressing-room_mobile-video.jpg?v=202506101828`,
        mobileMirrorImage: `/static/images/content/how-it-works-section/dressing-room_mobile-mirror.jpg?v=202506101828`,
        desktopVideoImage: `/static/images/content/how-it-works-section/dressing-room_desktop-video.jpg?v=202506101828`,
        desktopMirrorImage: `/static/images/content/how-it-works-section/dressing-room_desktop-mirror.jpg?v=202506101828`,
        accessories: [
          {
            id: 'intelligentLight',
            title: t('howItWorks.accessories.intelligentLight'),
            image:
              '/static/images/content/how-it-works-section/detail/intelligent-light.png?v=202506101828',
            coordinates: { left: '42.5%', top: '0.8%' },
            coordinatesMobile: { left: '18.4%', top: '4.1%' },
          },
          {
            id: 'motionSensor',
            title: t('howItWorks.accessories.motionSensor'),
            image:
              '/static/images/content/how-it-works-section/detail/motion-sensor.png?v=202506101828',
            coordinates: { right: '20.1%', top: '6.2%' },
            coordinatesMobile: { right: '2%', top: '8.1%' },
          },
          {
            id: 'cuttOffSensor',
            title: t('howItWorks.accessories.cutOffSensor'),
            image:
              '/static/images/content/how-it-works-section/detail/cut-off-sensor.png?v=202506101828',
            coordinates: { left: '66.7%', top: '5.4%' },
            coordinatesMobile: { right: '24.4%', top: '9.1%' },
          },
          {
            id: 'touchPanel',
            title: t('howItWorks.accessories.touchPanel'),
            image:
              '/static/images/content/how-it-works-section/detail/touch-panel.png?v=202506101828',
            coordinates: { right: '20.6%', top: '37.8%' },
            coordinatesMobile: { right: '2%', top: '39.4%' },
          },
          {
            id: 'mirrorDisplay',
            title: t('howItWorks.accessories.mirrorDisplay'),
            image:
              '/static/images/content/how-it-works-section/detail/mirror-display.png?v=202506101828',
            coordinates: { right: '25.4%', top: '61.6%' },
            coordinatesMobile: { right: '12.5%', top: '64.5%' },
          },
          {
            id: 'flap',
            title: t('howItWorks.accessories.flap'),
            image: '/static/images/content/how-it-works-section/detail/flap.png?v=202506101828',
            coordinates: { left: '2.3%', bottom: '22.6%' },
            coordinatesMobile: { left: '5.8%', top: '57.1%' },
          },
          {
            id: 'camera',
            title: t('howItWorks.accessories.camera'),
            image: '/static/images/content/how-it-works-section/detail/camera.png?v=202506101828',
            coordinates: { left: '0.1%', bottom: '21.4%' },
            coordinatesMobile: { left: '0.2%', top: '58.5%' },
          },
          {
            id: 'smartVoiceAssistant',
            title: t('howItWorks.accessories.smartVoiceAssistant'),
            image:
              '/static/images/content/how-it-works-section/detail/smart-voice-assistant.png?v=202506101828',
            coordinates: { right: '21%', bottom: '40%' },
            coordinatesMobile: { right: '3%', bottom: '40.3%' },
          },
        ],
      },
      {
        id: 'demo_beauty_salon',
        label: t('howItWorks.tabs.beautySalon', 'Beauty Salon'),
        mobileVideoImage: `/static/images/content/how-it-works-section/beauty-salon_mobile-video.jpg?v=202506101828`,
        mobileMirrorImage: `/static/images/content/how-it-works-section/beauty-salon_mobile-mirror.jpg?v=202506101828`,
        desktopVideoImage: `/static/images/content/how-it-works-section/beauty-salon_desktop-video.jpg?v=202506101828`,
        desktopMirrorImage: `/static/images/content/how-it-works-section/beauty-salon_desktop-mirror.jpg?v=202506101828`,
        accessories: [
          {
            id: 'wirelessStreamingCamera',
            title: t('howItWorks.accessories.wirelessStreamingCamera'),
            image:
              '/static/images/content/how-it-works-section/detail/wireless-streaming-camera.png?v=202506101828',
            coordinates: { left: '34.2%', top: '43.6%' },
            coordinatesMobile: { left: '20.2%', top: '43.6%' },
            tooltipPlacement: 'left',
            tooltipFallbackPlacements: ['bottom', 'top'],
          },
          {
            id: 'cameraChargingPlatform',
            title: t('howItWorks.accessories.cameraChargingPlatform'),
            image:
              '/static/images/content/how-it-works-section/detail/сamera-charging-platform.png?v=202506101828',
            coordinates: { right: '34.5%', top: '47.5%' },
            coordinatesMobile: { right: '10.5%', top: '47.5%' },
            tooltipPlacement: 'bottom',
            tooltipFallbackPlacements: ['right'],
          },
          {
            id: 'intelligentLight',
            title: t('howItWorks.accessories.intelligentLight'),
            image:
              '/static/images/content/how-it-works-section/detail/intelligent-light.png?v=202506101828',
            coordinates: { right: '46.5%', top: '14.5%' },
            coordinatesMobile: { right: '37.5%', top: '14.8%' },
            tooltipPlacement: 'left',
            tooltipFallbackPlacements: ['right', 'bottom', 'top'],
          },
          {
            id: 'motionSensor',
            title: t('howItWorks.accessories.motionSensor'),
            image:
              '/static/images/content/how-it-works-section/detail/motion-sensor.png?v=202506101828',
            coordinates: { right: '38.1%', top: '12.2%' },
            coordinatesMobile: { right: '19%', top: '11.1%' },
            tooltipPlacement: 'right',
            tooltipFallbackPlacements: ['left', 'bottom', 'top'],
          },
          {
            id: 'mirrorDisplay',
            title: t('howItWorks.accessories.mirrorDisplay'),
            image:
              '/static/images/content/how-it-works-section/detail/mirror-display.png?v=202506101828',
            coordinates: { right: '32.4%', top: '33.6%' },
            coordinatesMobile: { right: '5.4%', top: '25.6%' },
            tooltipPlacement: 'right',
            tooltipFallbackPlacements: ['left', 'bottom', 'top'],
          },
        ],
      },
    ],
    [t],
  );

  const items: Item[] = useMemo(
    () =>
      [
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
    [t],
  );

  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const [activeAccessoryId, setActiveAccessoryId] = useState<string | null>(null);
  const accessoriesRefs = useRef<Record<string, HTMLElement | null>>({});
  const tooltipData = useRef<{
    image: string;
    title: string;
    placement?: PopperPlacement;
    fallbackPlacements?: PopperPlacement[];
  } | null>(null);
  const tooltipRef = useRef<HTMLElement | null>(null);
  const tooltipTimerRef = useRef<number>();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Reset selected accessory when switching tabs
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.id === activeTabId)!;
    currentTab.accessories.forEach((acc) => {
      accessoriesRefs.current[`${currentTab.id}_${acc.id}`] = null;
    });
    if (currentTab.accessories.length > 0) {
      setActiveAccessoryId(currentTab.accessories[0].id);
    } else {
      setActiveAccessoryId(null);
    }
  }, [activeTabId, tabs]);

  const handlePointClick = (id: string, tabId: string) => {
    setActiveAccessoryId(id);
    const currentTab = tabs.find((tab) => tab.id === tabId)!;
    const accessory = currentTab.accessories.find((acc) => acc.id === id)!;
    tooltipData.current = {
      title: accessory.title,
      image: accessory.image,
      placement: accessory.tooltipPlacement,
      fallbackPlacements: accessory.tooltipFallbackPlacements,
    };
    setIsTooltipOpen(true);
    if (tooltipTimerRef.current) {
      window.clearTimeout(tooltipTimerRef.current);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        isTooltipOpen &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipOpen(false);
      }
    };

    if (isTooltipOpen) {
      tooltipTimerRef.current = window.setTimeout(() => {
        setIsTooltipOpen(false);
      }, 7000);
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      if (tooltipTimerRef.current) {
        window.clearTimeout(tooltipTimerRef.current);
      }
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isTooltipOpen]);

  return (
    <section
      id="how-it-works"
      className={clsx('py-56 md:py-88 bg-indigo-50 text-dark-800', className)}
    >
      <div className="container">
        {/* Section title */}
        <h2 className="text-40px md:text-56px whitespace-pre-wrap text-center">
          {t('howItWorks.title')}
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center mt-24 lg:mt-56 w-[460px] max-w-full mx-auto">
          {tabs.map((tab) => (
            <Button
              color={activeTabId === tab.id ? 'primary' : 'dark'}
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className="text-xl grow"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* All tab contents rendered at once, visibility toggled via class */}
      <div className="overflow-hidden">
        <div className="container">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={clsx('transition-opacity duration-500', {
                'opacity-100 block': tab.id === activeTabId,
                'opacity-0 hidden': tab.id !== activeTabId,
              })}
            >
              {/* Mobile version */}
              <div className="relative md:hidden">
                <img
                  src={tab.mobileVideoImage}
                  className="max-w-full z-[1]"
                  alt=""
                  // loading="lazy"
                />
                <img
                  src={tab.mobileMirrorImage}
                  className={clsx(styles.fadeImage, 'absolute left-0 top-0 right-0 w-full z-[2]')}
                  alt=""
                  // loading="lazy"
                />
                <div className="absolute inset-0 z-[10] bg-dark-700/10">
                  {tab.accessories.map(({ id, coordinatesMobile }) => (
                    <button
                      key={id}
                      type="button"
                      className={clsx(
                        styles.pointer,
                        activeAccessoryId === id && styles.pointerActive,
                        'w-15 h-15 absolute rounded-full',
                        activeAccessoryId === id ? 'text-primary-light' : 'text-white',
                      )}
                      style={{ ...coordinatesMobile }}
                      onClick={() => handlePointClick(id, tab.id)}
                      ref={(el) => (accessoriesRefs.current[`${tab.id}_${id}`] = el)}
                    >
                      <svg
                        className="w-full h-full pointer-events-none [&_circle]:transition-opacity"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
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

              {/* Desktop version */}
              <div className="relative hidden md:block">
                <img
                  src={tab.desktopVideoImage}
                  className="max-w-full z-[1]"
                  alt=""
                  // loading="lazy"
                />
                <img
                  src={tab.desktopMirrorImage}
                  className={clsx(styles.fadeImage, 'absolute left-0 top-0 right-0 w-full z-[2]')}
                  alt=""
                  // loading="lazy"
                />
                <div className="absolute inset-0 z-[10]">
                  {tab.accessories.map(({ id, coordinates }) => (
                    <button
                      key={id}
                      type="button"
                      className={clsx(
                        styles.pointer,
                        activeAccessoryId === id && styles.pointerActive,
                        'w-24 h-24 absolute rounded-full',
                        activeAccessoryId === id ? 'text-primary-light' : 'text-white',
                      )}
                      style={{ ...coordinates }}
                      onClick={() => handlePointClick(id, tab.id)}
                      ref={(el) => (accessoriesRefs.current[`${tab.id}_${id}`] = el)}
                    >
                      <svg
                        className="w-full h-full pointer-events-none [&_circle]:transition-opacity"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 12 12"
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
          ))}
        </div>
      </div>

      {/* Common bottom block */}
      <div className="mt-24 md:mt-40">
        <div className="container">
          <div className="row gy-16 md:gy-32">
            {items.map(({ iconName, text }) => (
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

      {/* Tooltip */}
      {isTooltipOpen && activeAccessoryId && (
        <Tooltip
          referenceElement={accessoriesRefs.current[`${activeTabId}_${activeAccessoryId}`]}
          content={tooltipData.current ? <PointTooltipContent {...tooltipData.current} /> : null}
          placement={tooltipData.current?.placement}
          fallbackPlacements={tooltipData.current?.fallbackPlacements}
          tooltipRef={tooltipRef}
        />
      )}
    </section>
  );
};

type TooltipProps = {
  referenceElement: HTMLElement | null;
  content: ReactNode;
  tooltipRef: React.MutableRefObject<HTMLElement | null>;
  placement?: PopperPlacement;
  fallbackPlacements?: PopperPlacement[];
  offsetDistance?: number;
};

const Tooltip = ({
  referenceElement,
  content,
  tooltipRef,
  placement = 'bottom',
  fallbackPlacements = ['top'],
  offsetDistance = 8,
}: TooltipProps) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const popperOptions = useMemo<Parameters<typeof usePopper>[2]>(
    () => ({
      placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, offsetDistance],
          },
        },
        { name: 'arrow' },
        {
          name: 'flip',
          options: {
            fallbackPlacements,
          },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: document.body,
          },
        },
      ],
    }),
    [placement, fallbackPlacements, offsetDistance],
  );
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    popperOptions,
  );

  return createPortal(
    referenceElement && content ? (
      <div
        className="z-[999] max-md:!bottom-0 max-md:!left-0 max-md:!right-0 max-md:!top-auto"
        ref={(el) => {
          tooltipRef.current = el;
          setPopperElement(el);
        }}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        {content}
      </div>
    ) : null,
    document.body,
  );
};

const PointTooltipContent = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="text-center max-w-[180px]">
      <div className="bg-dark py-10 px-16">
        <img
          className="w-100 h-100 mx-auto object-contain shrink-0"
          src={image}
          alt=""
          loading="lazy"
        />
      </div>
      <h3 className="py-10 px-16 bg-dark-light md:max-lg:text-sm text-md text-white">{title}</h3>
    </div>
  );
};

export type { HowItWorksSectionProps };
export { HowItWorksSection };
