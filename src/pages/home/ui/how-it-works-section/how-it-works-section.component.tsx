import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, type IconProps } from '@/shared/ui/icon';

interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection = ({ className }: HowItWorksSectionProps) => {
  const { t } = useTranslation();
  const data = {
    title: t('howItWorks.title'),
    accessories: [
      {
        id: 'touchPanel',
        title: t('howItWorks.accessories.touchPanel'),
        image: '/static/images/content/how-it-works-section/touch-panel.jpg',
        coordinates: { left: 151 / 1043, top: 262 / 596 },
      },
      {
        id: 'camera',
        title: t('howItWorks.accessories.camera'),
        image: '/static/images/content/how-it-works-section/camera.jpg',
        coordinates: { left: 197 / 1043, top: 250 / 596 },
      },
      {
        id: 'flap',
        title: t('howItWorks.accessories.flap'),
        image: '/static/images/content/how-it-works-section/flap.jpg',
        coordinates: { left: 648 / 1043, top: 250 / 596 },
      },
      {
        id: 'cuttOffSensor',
        title: t('howItWorks.accessories.cutOffSensor'),
        image: '/static/images/content/how-it-works-section/cut-off-sensor.jpg',
        coordinates: { left: 620 / 1043, top: 180 / 596 },
      },
      {
        id: 'motionSensor',
        title: t('howItWorks.accessories.motionSensor'),
        image: '/static/images/content/how-it-works-section/motion-sensor.jpg',
        coordinates: { right: 120 / 1043, top: 180 / 596 },
      },
      {
        id: 'mirrorDisplay',
        title: t('howItWorks.accessories.mirrorDisplay'),
        image: '/static/images/content/how-it-works-section/mirror-display.jpg',
        coordinates: { right: 100 / 1043, top: 280 / 596 },
      },
      {
        id: 'intelligentLight',
        title: t('howItWorks.accessories.intelligentLight'),
        image: '/static/images/content/how-it-works-section/intelligent-light.jpg',
        coordinates: { right: 60 / 1043, bottom: 180 / 596 },
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

  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeAccessoryId, setActiveAccessoryId] = useState(() => data.accessories[0].id);

  // useEffect(() => {
  //   setActiveAccessoryId(data.accessories[selectedIndex].id)
  // }, [selectedIndex]);

  return (
    <section
      id="how-it-works"
      className={clsx('py-56 md:py-86 bg-indigo-50 text-dark-800', className)}
    >
      <div className="container">
        <h2 className="text-40px md:text-56px whitespace-pre-wrap text-center">{data.title}</h2>
        <div className="mt-24 lg:mt-56 overflow-hidden">
          <div
            className="grid
          grid-cols-[repeat(3,minmax(6.75rem,1fr))]
          md:grid-cols-[repeat(4,minmax(10.325rem,1fr))]
          xl:grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]
          xxl:grid-cols-[repeat(auto-fill,minmax(10.125rem,1fr))]
          gap-4 md:gap-8"
          >
            {data.accessories.map(({ id, title }) => (
              <button
                key={id}
                type="button"
                className={clsx(
                  `w-full text-xs md:text-sm leading-1 px-12 py-14 md:p-14
                 bg-indigo-200 text-dark-800`,
                  activeAccessoryId === id && 'bg-gray-400 cursor-default',
                  activeAccessoryId !== id && 'hover:bg-gray-300',
                )}
                onClick={() => setActiveAccessoryId(id)}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-24 md:mt-40 overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden scroll-smooth c-hide-native-scrollbar">
          <div className="container">
            <div className="inline-flex after:content-[''] after:w-[calc((100vw-var(--container-max-width))/2+var(--container-gutter))] after:shrink-0 lg:after:content-none">
              <div className="relative infline-flex shrink-0">
                <img
                  src="/static/images/content/how-it-works-section/scene.png"
                  className="h-[16.5rem] md:h-[42.8125rem] max-w-none lg:h-auto lg:max-w-full"
                  alt=""
                />
                {data.accessories.map(({ id, coordinates }) => (
                  <button
                    key={id}
                    type="button"
                    className="w-24 h-24 absolute -translate-x-1/2 -translate-y-1/2"
                    style={Object.keys(coordinates).reduce((acc, key) => {
                      if (coordinates[key] === undefined) return acc;

                      acc[key] = `${coordinates[key] * 100}%`;
                      return acc;
                    }, {})}
                    onClick={() => setActiveAccessoryId(id)}
                  >
                    <svg
                      className="w-full h-full text-white [&_circle]:transition-opacity"
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
                        r="3"
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
    </section>
  );
};

export type { HowItWorksSectionProps };
export { HowItWorksSection };
