import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { supportedLanguagesMap, supportedLanguageCodes } from '@/shared/config/i18n-config';
import { $$i18n } from '@/shared/i18n';
import { useCurrentRoute } from '@/shared/routing';
import { Dropdown } from '../dropdown';
import { Button } from '../button';

interface LanguageSelectProps {
  className?: string;
}

const LanguageSelect = ({ className }: LanguageSelectProps) => {
  const { i18n } = useTranslation();
  const changeLanguage = useUnit($$i18n.changeLanguageTriggered);
  const currentRoute = useCurrentRoute();
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
          <Button color="custom" className="bg-dark hover:bg-primary/[0.08] text-white">
            <div className="flex items-center">
              <img
                className="w-20 h-20 shrink-0"
                src={`/static/images/flags/langs/round/${i18n.language.toLowerCase()}.svg`}
                alt={i18n.language}
              />
              <span className="ml-5 text-md">{i18n.language.toUpperCase()}</span>
            </div>
          </Button>
        }
      >
        {({ close }) => (
          <div className="flex flex-col bg-dark">
            {supportedLanguageCodes.map((languageCode) => (
              <Button
                key={languageCode}
                color="custom"
                className={clsx(
                  'bg-dark text-white',
                  languageCode === i18n.language ? 'bg-primary/[0.15]' : 'hover:bg-primary/[0.08]',
                )}
                onClick={() => {
                  changeLanguage({ languageCode, currentRoute: currentRoute! });
                  close();
                }}
              >
                <div className={clsx('flex items-center')}>
                  <img
                    className="w-20 h-20 shrink-0"
                    src={`/static/images/flags/langs/round/${languageCode.toLowerCase()}.svg`}
                    alt={languageCode}
                  />
                  <span className="ml-5">{supportedLanguagesMap[languageCode]}</span>
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
