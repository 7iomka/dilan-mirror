import { LanguageSelect } from '@/shared/ui/language-select';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <div className={className}>
      <div className="container">
        <div className="flex">
          <div className="ml-auto mr-0">
            <LanguageSelect />
          </div>
        </div>
      </div>
    </div>
  );
};

export type { HeaderProps };
export { Header };
