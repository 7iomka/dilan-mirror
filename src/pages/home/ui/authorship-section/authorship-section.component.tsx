import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

interface AuthorshipSectionProps {
  className?: string;
}

const AuthorshipSection = ({ className }: AuthorshipSectionProps) => {
  const { t } = useTranslation();

  const data = {
    title: t('authorship.title', { authorInitials: 'Vasile Dilan' }),
    subtitle: t('authorship.subtitle'),
    description: t('authorship.description'),
    image: '/static/images/content/authorship-section/author.jpg',
    patents: [
      {
        flagImageUrl: '/static/images/flags/countries/france.svg',
        title: t('authorship.patentFrance.title'),
        description: t('authorship.patentFrance.description'),
        documentUrl: '/static/documents/patents/france.pdf',
      },
    ],
    showDocumentActionText: t('authorship.showDocumentActionText'),
  };

  return (
    <section className={clsx('py-56 md:py-88 bg-dark-500', className)}>
      <div className="container">
        <div className="row gy-32 justify-between">
          <div className="col-12 md:col-5 lg:col-4">
            <div className="sticky top-60 lg:top-80 ">
              <div className="aspect-w-[37.5] aspect-h-[41] md:aspect-w-[1] md:aspect-h-[1.35] max-xsl:min-w-container-min max-xsl:left-1/2 max-xsl:-translate-x-1/2">
                <img src={data.image} alt="" className="object-cover object-bottom" />
                <div>
                  <div className="absolute bottom-0 left-0 right-0 h-[24%] bg-[linear-gradient(0deg,#141419_0%,rgba(20,20,25,0)_100%)]" />
                  <div className="z-[2] flex flex-col items-start justify-end p-24 absolute bottom-0 left-0 right-0">
                    <Button
                      className="flex justify-center min-w-200 text-sm md:text-lg p-14"
                      color="white-semi-transparent"
                      size="custom"
                      component="a"
                      href="#!"
                    >
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-7 lg:col-8">
            <div className="min-h-full flex flex-col justify-between">
              <div className="flex-grow min-h-0">
                <h2 className="text-40px md:text-56px">{data.title}</h2>
                <div className="indigo-200 text-xl md:text-2xl mt-12">{data.subtitle}</div>
                <div className="indigo-200 text-md md:text-lg mt-32 lg:mt-48 whitespace-pre-wrap">
                  {data.description}
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
                          href={patent.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm md:text-lg hover:underline hover:text-primary underline-offset-2 max-w-200"
                        >
                          <Icon name="file" className="text-xl" />
                          <span className="ml-8 md:ml-12">{data.showDocumentActionText}</span>
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
