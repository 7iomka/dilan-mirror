import type { ReactNode } from 'react';

interface FullPageWrapperProps {
  children: ReactNode;
}

const FullPageWrapper = (props: FullPageWrapperProps) => {
  const { children } = props;

  return <div>{children}</div>;
};

export { FullPageWrapper };
