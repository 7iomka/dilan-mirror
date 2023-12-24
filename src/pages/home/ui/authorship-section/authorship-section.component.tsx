import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { appConfig } from '@/shared/config/app-config';
import { Fancybox } from '@/shared/ui/fancybox';
import styles from './authorship-section.module.css';

interface AuthorshipSectionProps {
  className?: string;
}

const AuthorshipSection = ({ className }: AuthorshipSectionProps) => {
  const { t } = useTranslation();

  const data = {
    title: t('authorship.title'),
    subtitle: t('authorship.subtitle'),
    description: t('authorship.description'),
    image: '/static/images/content/authorship-section/author.jpg',
    patents: [
      {
        flagImageUrl: '/static/images/flags/countries/france.svg',
        title: t('authorship.patentFrance.title'),
        description: t('authorship.patentFrance.description'),
        docUrl: 'https://drive.google.com/drive/u/0/folders/1i7uHXRGp5VNqelmnjxtZdo91f0aVlJUy',
      },
    ],
    showDocumentsActionText: t('authorship.showDocumentsActionText'),
    interview: {
      src: '/static/images/content/authorship-section/interview.jpg',
      videoId: 'bNzsW7iouSU',
    },
  };

  return (
    <section id="authorship" className={clsx('py-56 md:py-88 bg-dark-500', className)}>
      <div className="container">
        <div className="row gy-32 justify-between">
          <div className="col-12 md:col-5 lg:col-4">
            <div className="sticky top-60 lg:top-80 ">
              <div className="aspect-w-[37.5] aspect-h-[41] md:aspect-w-[1] md:aspect-h-[1.35] max-xsl:min-w-container-min max-xsl:left-1/2 max-xsl:-translate-x-1/2">
                <img
                  src={data.image}
                  alt=""
                  className="object-cover [object-position:50%_75%] md:object-bottom"
                />
                <div>
                  <div className="absolute bottom-0 left-0 right-0 h-[24%] bg-[linear-gradient(0deg,#141419_0%,rgba(20,20,25,0)_100%)]" />
                  <div className="z-[2] flex flex-col items-start justify-end p-24 absolute bottom-0 left-0 right-0">
                    <Button
                      className="flex justify-center min-w-200 text-sm md:text-lg p-14"
                      color="white-semi-transparent"
                      size="custom"
                      component="a"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={appConfig.instagramPersonalURL}
                    >
                      <Icon name="instagram" className="text-xl" />
                      <span className="ml-8 md:ml-12">Instagram</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-7 lg:col-8 lp:col-7">
            <div className="min-h-full flex flex-col justify-between">
              <div className="flex-grow min-h-0">
                <h2 className="text-40px md:text-56px">{data.title}</h2>
                <div className="indigo-200 text-xl md:text-2xl mt-12">{data.subtitle}</div>
                <div className="indigo-200 text-md md:text-lg mt-32 lg:mt-48 whitespace-pre-wrap">
                  {data.description}
                </div>
                <div className="mt-32">
                  <Fancybox
                    options={{
                      Thumbs: {
                        type: 'classic',
                      },
                    }}
                  >
                    <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
                      <img
                        src={data.interview.src}
                        className="absolute inset-0 w-full h-full object-cover select-none"
                        alt=""
                      />
                      <div className={styles.playButton}>
                        <a
                          aria-label={t('actions.playVideo')}
                          data-fancybox={data.interview.videoId}
                          href={`https://www.youtube.com/${data.interview.videoId}&amp;autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=0`}
                        >
                          <svg
                            className={styles.playButtonIcon}
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="230"
                            height="230"
                            viewBox="0 0 230 230"
                          >
                            <defs>
                              <filter id="blur-play-fx" filterUnits="userSpaceOnUse">
                                <feFlood floodColor="#FFFFFF" floodOpacity="0.530" />
                                <feComposite operator="in" in2="SourceAlpha" result="outGlowFill" />
                                <feMorphology operator="dilate" radius="2" result="outGlowFill" />
                                <feGaussianBlur stdDeviation="4.7" result="outGlowBlur" />
                                <feComposite
                                  operator="out"
                                  in="outGlowBlur"
                                  in2="SourceAlpha"
                                  result="outGlowMasked"
                                />
                                <feComposite
                                  operator="over"
                                  in="outGlowMasked"
                                  in2="SourceGraphic"
                                  result="outerGlow"
                                />
                              </filter>
                            </defs>
                            <g>
                              <g className={styles.playButtonCircle} filter="url(#blur-play-fx)">
                                <path
                                  className="transition-all duration-500"
                                  d="M115.000,14.406 C170.557,14.406 215.594,59.443 215.594,115.000 C215.594,170.557 170.557,215.594 115.000,215.594 C59.443,215.594 14.406,170.557 14.406,115.000 C14.406,59.443 59.443,14.406 115.000,14.406 z"
                                  fill="none"
                                  stroke="#FFFFFF"
                                  strokeWidth="5"
                                />
                              </g>
                              <path
                                className={clsx(
                                  styles.playButtonTriangle,
                                  'transition-all duration-500',
                                )}
                                d="M155.526,114.519 L90.858,151.856 L90.858,77.183 L155.526,114.519 z"
                                fill="#FFFFFF"
                                filter="url(#blur-play-fx)"
                              />
                            </g>
                          </svg>
                          <span className={clsx(styles.playButtonOuterCircle, styles.n1)} />
                          <span className={clsx(styles.playButtonOuterCircle, styles.n2)} />
                        </a>
                      </div>
                    </div>
                  </Fancybox>
                </div>
              </div>
              <div className="mt-40">
                <div className="space-y-15">
                  {data.patents.map((patent) => (
                    <div key={patent.title} className="bg-dark-800 flex flex-col lg:flex-row">
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center p-16 md:p-24">
                          <div className="shrink-0 relative flex items-center justify-center w-56 h-56 md:w-72 md:h-72 border border-dark-400">
                            <Icon name="shield-check" className="text-[2rem] text-primary-pale" />
                            <img
                              src={patent.flagImageUrl}
                              alt=""
                              className="w-10 h-10 absolute right-5 top-5"
                            />
                          </div>
                          <div className="ml-16 md:ml-24">
                            <div className="text-md md:text-xl font-bold">{patent.title}</div>
                            <div className="text-md md:text-lg mt-2 md:mt-4">
                              {patent.description}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 border-t border-t-dark-500 lg:border-t-0 border-l border-l-dark-500 p-18 lg:p-22 flex flex-col items-center justify-center">
                        <a
                          href={patent.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm md:text-lg hover:underline hover:text-primary underline-offset-2 max-w-200"
                        >
                          <Icon name="file" className="text-xl" />
                          <span className="ml-8 md:ml-12">{data.showDocumentsActionText}</span>
                        </a>
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

export type { AuthorshipSectionProps };
export { AuthorshipSection };
