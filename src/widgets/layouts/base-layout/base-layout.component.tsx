import type { PropsWithChildren } from 'react';
import { Header } from '@/widgets/header';
import { Head } from '../core';

interface BaseLayoutProps extends PropsWithChildren {
  className?: string;
}

const BaseLayout = ({ className, children }: BaseLayoutProps) => {
  return (
    <>
      <Head />
      <div className={className}>
        <Header />
        {children}
      </div>
    </>
  );
};

export type { BaseLayoutProps };
export { BaseLayout };
