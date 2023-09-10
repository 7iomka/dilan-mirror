import { forwardRef } from 'react';
import clsx from 'clsx';
import { createPolymorphicComponent } from '@/shared/lib/create-polymorphic-component';
import type { BoxProps } from '../box';
import { Box } from '../box';

interface ButtonProps extends BoxProps {
  children?: React.ReactNode;
  color?: 'primary' | 'dark' | 'custom';
  size?: 'md';
}

const colorsMap = {
  primary: 'bg-primary hover:bg-primary-light text-dark-800',
  dark: 'bg-dark hover:bg-dark-light text-white',
};

const sizesMap = {
  md: 'text-sm p-14',
};

const Button = createPolymorphicComponent<'button', ButtonProps>(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ color = 'primary', size = 'md', className, children, ...others }, ref) => (
      <Box
        component="button"
        className={clsx(className, colorsMap[color], sizesMap[size])}
        {...others}
        ref={ref}
      >
        {children}
      </Box>
    ),
  ),
);
export type { ButtonProps };
export { Button };
