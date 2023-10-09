import type { PropsWithChildren, ReactNode } from 'react';
import { useRef, useEffect } from 'react';
import type { FancyboxOptionsType } from './fancybox.lib';
import { NativeFancybox } from './fancybox.lib';

interface FancyboxProps {
  children?: ReactNode;
  delegate?: string;
  options?: Partial<FancyboxOptionsType>;
}

const Fancybox = (props: PropsWithChildren<FancyboxProps>) => {
  const { delegate = '[data-fancybox]', options = {}, children, ...boxProps } = props;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return (
    <div {...boxProps} ref={containerRef}>
      {children}
    </div>
  );
};

export type { FancyboxProps };
export { Fancybox };
