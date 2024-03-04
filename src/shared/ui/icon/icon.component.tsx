import clsx from 'clsx';
import type { SVGProps } from 'react';
import type { IconName } from './icon.types';
import { SPRITE_PATH, getIconMeta } from './icon.lib';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const { viewBox, iconName, axis } = getIconMeta(name);
  return (
    <svg
      // We recommend to use specific component class for avoid collisions with other styles and simple override it
      className={clsx('c-icon', className)}
      viewBox={viewBox}
      data-axis={axis}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`${SPRITE_PATH}#${iconName}`} />
    </svg>
  );
};

export type { IconProps };
export { Icon };
