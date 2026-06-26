import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import type { CommitteeSocialDto } from '../../committee.types';
import { CommitteeFace } from '../committee-face';
import { CommitteeSocial } from '../committee-social';

interface CommitteePersonProps {
  className?: string;
  fullName: string;
  country: string;
  image: string;
  imageSize?: 'md' | 'xl';
  socials?: CommitteeSocialDto[];
}

const imageSizeClassNameMap: Record<Required<CommitteePersonProps>['imageSize'], string> = {
  md: 'w-80 h-80',
  xl: 'w-120 h-120',
};

const CommitteePerson = ({
  className,
  fullName,
  country,
  image,
  imageSize = 'md',
  socials,
}: CommitteePersonProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(className)}>
      <div className="flex flex-col items-center text-center">
        <CommitteeFace
          className={clsx(imageSizeClassNameMap[imageSize])}
          fullName={fullName}
          image={image}
          country={country}
        />
        <div className="mt-16">
          <h4 className="text-xl leading-1">{fullName.trim()}</h4>
          <div className="text-lg mt-4">{t(`country.${country.toLowerCase()}`, '')}</div>
        </div>
        {!!socials && socials.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-center sm:justify-end flex-wrap -mr-6 -mb-6">
              {socials.map(({ type, url }) => (
                <div className="mr-6 mb-6" key={type}>
                  <CommitteeSocial type={type} url={url} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export type { CommitteePersonProps };
export { CommitteePerson };
