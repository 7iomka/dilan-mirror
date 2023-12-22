import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { appConfig } from '@/shared/config/app-config';

interface InvestSectionProps {
  className?: string;
}

const InvestSection = ({ className }: InvestSectionProps) => {
  const { t, i18n } = useTranslation();
  const localeSettings: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const startDate = new Date(2023, 11, 14);
  const formattedCurrentDate = startDate.toLocaleDateString(i18n.language, localeSettings);
  const futureDate = new Date(2025, 11, 14);
  const formattedFutureDate = futureDate.toLocaleDateString(i18n.language, localeSettings);

  const data = {
    textBeforeTitle: t('invest.textBeforeTitle'),
    title: t('invest.title'),
    step1Text: t('invest.step1Text'),
    step2Text: t('invest.step2Text'),
    registerActionText: t('actions.register'),
    getConsultationActionText: t('actions.getConsultation'),
    footNoteText: t('invest.footNoteText'),
    valuePerShareToday: {
      text: t('invest.valuePerShareTodayText'),
      value: '0,01$',
    },
    costOfOneShareInTheForecast: {
      text: t('invest.costOfOneShareInTheForecastText'),
      value: '0,10$',
    },
  };

  return (
    <section className={clsx('py-56 md:py-88 lp:pt-120 relative overflow-hidden', className)}>
      <div className="container">
        <div className="row">
          <div className="col-12 md:col-6 order-1 md:order-0 relative z-[10] mt-154 md:mt-0">
            <div className="hidden md:block text-xs leading-1 tracking-[0.4em] font-bold uppercase">
              {data.textBeforeTitle}
            </div>
            <h1 className="text-40px lg:text-72px leading-1 mt-8 md:mt-20">{data.title}</h1>
            <div className="mt-20 md:mt-28">
              <div className="space-y-4 md:space-y-8">
                <div className="flex items-center">
                  <div className="shrink-0 relative flex items-center justify-center w-56 h-56 md:w-72 md:h-72 border border-dark-400">
                    <Icon name="account-box" className="text-[2rem] text-primary-pale" />
                    <div className="flex items-center justify-center absolute w-16 h-16 right-4 top-4 bg-dark-400">
                      <span className="text-xs font-bold text-indigo-200">1</span>
                    </div>
                  </div>
                  <div className="ml-16 md:ml-24">
                    <div className="text-md lg:text-2xl">{data.step1Text}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="shrink-0 relative flex items-center justify-center w-56 h-56 md:w-72 md:h-72 border border-dark-400">
                    <Icon name="shopping-basket" className="text-[2rem] text-primary-pale" />
                    <div className="flex items-center justify-center absolute w-16 h-16 right-4 top-4 bg-dark-400">
                      <span className="text-xs font-bold text-indigo-200">2</span>
                    </div>
                  </div>
                  <div className="ml-16 md:ml-24">
                    <div className="text-md lg:text-2xl">{data.step2Text}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-40 md:mt-48">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 basis-1/2 min-w-200 grow">
                  <Button className="flex justify-center" component="a" href={appConfig.accountURL}>
                    {data.registerActionText}
                  </Button>
                </div>
                <div className="p-4 basis-1/2 min-w-200 grow">
                  <Button
                    color="custom"
                    className="flex items-center justify-center bg-dark-500 hover:bg-dark-400 text-white"
                    component="a"
                    href={appConfig.telegramSupportURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="telegram-colored" className="text-xl" />
                    <span className="ml-8 md:ml-12"> {data.getConsultationActionText}</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-56 md:mt-88">
              <div className="text-xs md:text-sm text-gray-900">{data.footNoteText}</div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="flex justify-end">
              <div className="relative z-[2] flex justify-between w-182 h-46 mt-192">
                <div className="inline-flex relative z-[1] shrink-0 self-end">
                  <div className="relative z-[1] w-16 h-16">
                    <div className="w-full h-full rounded-full bg-white relative z-[2]" />
                    <div className="w-1 h-278 md:h-[100rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4 md:-translate-y-1/2 bg-[#186951]" />
                  </div>
                  <div className="w-152 absolute bottom-full mb-24 -right-16 z-[2]">
                    <div className="relative bg-dark-500 text-white">
                      <div className="relative z-[1] p-16">
                        <div className="text-[0.5rem] text-gray-900 leading-[1.5] tracking-[0.24em] font-bold uppercase">
                          {formattedCurrentDate}
                        </div>
                        <div className="mt-4 text-2xl font-bold">
                          {data.valuePerShareToday.value}
                        </div>
                        <div className="mt-8 text-sm">{data.valuePerShareToday.text}</div>
                      </div>
                      <div className="absolute w-16 h-16 right-16 bottom-0 text-dark-500 before:content-[''] before:absolute before:w-full before:h-full before:[transform:translateY(50%)_rotate(45deg)] before:bg-current before:inset-0 before:-mt-1" />
                    </div>
                  </div>
                </div>
                <div className="inline-flex relative z-[1] shrink-0 self-start">
                  <div className="relative z-[1] w-16 h-16 rounded-full bg-dark-800 border-2 border-white" />
                  <div className="w-152 absolute bottom-full mb-24 -right-16 z-[2]">
                    <div className="relative bg-dark-500 text-white">
                      <div className="relative z-[1] p-16">
                        <div className="text-[0.5rem] text-gray-900 leading-[1.5] tracking-[0.24em] font-bold uppercase">
                          {formattedFutureDate}
                        </div>
                        <div className="mt-4 text-2xl font-bold">
                          {data.costOfOneShareInTheForecast.value}
                        </div>
                        <div className="mt-8 text-sm">{data.costOfOneShareInTheForecast.text}</div>
                      </div>
                      <div className="absolute w-16 h-16 right-16 bottom-0 text-dark-500 before:content-[''] before:absolute before:w-full before:h-full before:[transform:translateY(50%)_rotate(45deg)] before:bg-current before:inset-0 before:-mt-1" />
                    </div>
                  </div>
                </div>
                <div className="absolute inline-flex top-[50%] left-[50%] -translate-x-[76%] -translate-y-[18.6%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1920"
                    height="290"
                    fill="none"
                    viewBox="0 0 1920 290"
                  >
                    <path
                      fill="url(#a)"
                      d="M89.374 259.744 0 273.698V290h1920V2l-283.53 13.954-27.74 13.955-212.65 27.908-43.14 26.267-181.83 15.596-24.66 14.775-138.68 20.521-43.147 36.117-144.848 11.492-52.391 16.417-114.029 18.058-67.801 6.567-64.719 11.492-98.62 4.925-49.31 8.208-160.257 4.104-123.274 7.388Z"
                    />
                    <path
                      stroke="#186951"
                      strokeDasharray="16 16"
                      strokeLinecap="round"
                      strokeWidth="4"
                      d="m1396.09 57.813 212.64-27.906 27.74-13.954L1920 2"
                    />
                    <path
                      stroke="url(#b)"
                      strokeLinecap="round"
                      strokeWidth="4"
                      d="m0 273.68 89.374-13.953 123.274-7.387 160.257-4.104 49.31-8.208 98.62-4.925 64.719-11.491 67.801-6.566 114.029-18.058 52.391-16.415 144.848-11.491 43.147-36.115 138.68-20.519 24.66-14.775 181.83-15.594 43.14-26.266"
                    />
                    <defs>
                      <linearGradient
                        id="a"
                        x1="960"
                        x2="960"
                        y1="2"
                        y2="290"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#186951" stopOpacity=".24" />
                        <stop offset="1" stopColor="#186951" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="b"
                        x1="1396"
                        x2="0"
                        y1="210"
                        y2="210"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#186951" />
                        <stop offset="1" stopColor="#186951" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute bottom-0 w-[85.8125rem] h-[42.8125rem] bg-[radial-gradient(50%_100%_at_50%_100%,#0C2D23_0%,rgba(12,45,35,0)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export type { InvestSectionProps };
export { InvestSection };
