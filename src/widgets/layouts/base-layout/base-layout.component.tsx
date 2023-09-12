import type { PropsWithChildren } from 'react';
import type { HeaderProps } from '@/widgets/header';
import { Header, StickyHeader } from '@/widgets/header';
import { Head } from '../core';

interface BaseLayoutProps extends PropsWithChildren {
  className?: string;
  withStickyHeader?: boolean;
  headerProps?: HeaderProps;
}

const BaseLayout = ({ className, withStickyHeader, headerProps, children }: BaseLayoutProps) => {
  return (
    <>
      <Head />
      <div className={className}>
        <div className="absolute flex justify-center -z-[1] left-0 right-0 top-0 mx-auto h-[100vh] lg:h-[1373px] opacity-48 overflow-hidden">
          <div className="w-full lg:w-[1373px] aspect-w-1 aspect-h-1 !h-auto">
            <div className="[background-image:radial-gradient(50%_50%_at_50%_50%,_#0C2D23_0%,_rgba(12,45,35,0)_100%)] translate-x-[12.3%] -translate-y-[50%]" />
          </div>
        </div>
        {withStickyHeader ? <StickyHeader {...headerProps} /> : <Header {...headerProps} />}
        {children}
      </div>
    </>
  );
};

export type { BaseLayoutProps };
export { BaseLayout };
