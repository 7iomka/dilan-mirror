import { PatentCountry } from '../patent-country';
import type { Patent } from '../../patent.types';

interface PatentCountryListProps {
  className?: string;
  title: string;
  items: Patent[];
  onItemClick: (code: string) => void;
}

const PatentCountryList = ({ className, title, items, onItemClick }: PatentCountryListProps) => {
  return (
    <div className={className}>
      <h3 className="text-2xl md:text-[32px] lg:text-40px leading-1 text-center md:text-left flex">
        <hr className="border-t-dark-400 h-1 flex-grow min-w-0 self-center mr-15 md:mr-20 mt-5" />
        <span className="block max-w-[calc(100%-64px)]">{title}</span>
        <hr className="border-t-dark-400 h-1 flex-grow min-w-0 self-center ml-15 md:ml-20 mt-5" />
      </h3>
      <div className="mt-40 grid gap-x-12 md:gap-x-24 gap-y-20 [grid-template-columns:repeat(auto-fill,minmax(3.5rem,1fr))] md:[grid-template-columns:repeat(auto-fill,minmax(5.5rem,1fr))]">
        {items.map((patent) => (
          <PatentCountry key={patent.code} data={patent} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
};

export type { PatentCountryListProps };
export { PatentCountryList };
