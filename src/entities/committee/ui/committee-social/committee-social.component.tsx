import clsx from 'clsx';
import { Icon } from '@/shared/ui/icon';
import type { IconName } from '@/shared/ui/icon/icon.types';
import type { CommitteeSocialDto } from '../../committee.types';

interface CommitteeSocialProps {
  className?: string;
  type: CommitteeSocialDto['type'];
  url: string;
}

const CommitteeSocial = ({ className, type, url }: CommitteeSocialProps) => {
  return (
    <a
      className={clsx(
        'flex items-center justify-center shrink-0 w-40 h-40 border border-dark-800 hover:border-dark-700 bg-dark-700 hover:bg-dark-600 text-white',
        className,
      )}
      aria-label={type}
      title={type}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon
        className={clsx('w-[50%] h-[50%] shrink-0')}
        name={type.toLocaleLowerCase() as IconName}
      />
    </a>
  );
};

export type { CommitteeSocialProps };
export { CommitteeSocial };
