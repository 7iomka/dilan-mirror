import clsx from 'clsx';
import { Flag } from '@/shared/ui/flag';

interface CommitteeFaceProps {
  className?: string;
  fullName: string;
  country: string;
  image: string;
}

const CommitteeFace = ({ className, fullName, country, image }: CommitteeFaceProps) => {
  return (
    <div className={clsx('relative inline-block', className)}>
      <img
        className="w-full h-full rounded-full object-cover object-top"
        src={image}
        alt={fullName}
        loading="lazy"
      />
      <Flag
        code={country.toLocaleLowerCase()}
        className="absolute w-[28%] right-0 bottom-0 h-auto"
      />
    </div>
  );
};

export type { CommitteeFaceProps };
export { CommitteeFace };
