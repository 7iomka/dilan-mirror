import React, { forwardRef } from 'react';
import cx from 'clsx';
import { isNumberLike } from '@/shared/lib/is-number-like';
import { createPolymorphicComponent } from '@/shared/lib/create-polymorphic-component';
import { getBoxMod } from './box.lib';

export type Mod = Record<string, any> | string;
export type BoxMod = Mod | Mod[] | BoxMod[];

export interface BoxProps {
  /** Class added to the root element, if applicable */
  className?: string;
}

export type ElementProps<
  ElementType extends React.ElementType,
  PropsToOmit extends string = never,
> = Omit<React.ComponentPropsWithoutRef<ElementType>, 'style' | PropsToOmit>;

export interface BoxComponentProps extends BoxProps {
  /** Variant passed from parent component, sets `data-variant` */
  variant?: string;

  /** Size passed from parent component, sets `data-size` if value is not number like */
  size?: string | number;

  /** Element modifiers transformed into `data-` attributes, for example, `{ 'data-size': 'xl' }`, falsy values are removed */
  mod?: BoxMod;
}

const _Box = forwardRef<HTMLDivElement, BoxComponentProps & { component: any; className: string }>(
  ({ component, className, variant, mod, size, ...rest }, ref) => {
    const Element = component || 'div';

    return (
      <Element
        ref={ref}
        className={cx(className)}
        data-variant={variant}
        data-size={isNumberLike(size) ? undefined : size || undefined}
        {...getBoxMod(mod)}
        {...rest}
      />
    );
  },
);

_Box.displayName = 'Box';

export const Box = createPolymorphicComponent<'div', BoxComponentProps>(_Box);
