import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { supportedLanguagesMap, supportedLanguageCodes } from '@/shared/config/i18n-config';
import { $$i18n } from '@/shared/i18n';
import { Dropdown } from '../dropdown';
import { Button } from '../button';

interface LanguageSelectProps {
  className?: string;
}

const LanguageSelect = ({ className }: LanguageSelectProps) => {
  const { i18n } = useTranslation();
  const changeLanguage = useUnit($$i18n.changeLanguageTriggered);
  // const isRTL = getIsRtlFromLangCode(i18n.language as SupportedLanguageCode);

  return (
    <div className={clsx('flex items-center gap-2', className)}>
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
            className="border border-dark-800 hover:border-dark-700 bg-dark-700 hover:bg-dark-600 text-white h-20 md:h-30 px-4 md:px-6"
          >
            <div className="flex items-center">
              <img
                width="1em"
                height="1em"
                className="w-12 h-12 md:w-14 md:h-14 hrink-0"
                src={`/static/images/flags/langs/round/${i18n.language.toLowerCase()}.svg`}
                alt=""
              />
              <span className="ml-5 text-sm md:text-md leading-1">
                {i18n.language.toUpperCase()}
              </span>
            </div>
          </Button>
        }
      >
        {({ close }) => (
          <div className="flex flex-col bg-dark max-h-[420px] overflow-y-auto">
            {supportedLanguageCodes.map((languageCode) => (
              <Button
                key={languageCode}
                color="custom"
                className={clsx(
                  'bg-dark text-white',
                  languageCode === i18n.language ? 'bg-primary/[0.15]' : 'hover:bg-primary/[0.08]',
                )}
                onClick={() => {
                  changeLanguage({ languageCode });
                  close();
                }}
              >
                <div className={clsx('flex items-center')}>
                  <img
                    width="1em"
                    height="1em"
                    className="text-md w-[1em] h-[1em] shrink-0"
                    src={`/static/images/flags/langs/round/${languageCode.toLowerCase()}.svg`}
                    alt=""
                  />
                  <span className="ml-5 text-md">{supportedLanguagesMap[languageCode]}</span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </Dropdown>
    </div>
  );
};

export type { LanguageSelectProps };
export { LanguageSelect };
