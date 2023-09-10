import clsx from 'clsx';
import type { SVGProps } from 'react';
import type { SpritesMap } from './sprite.gen';

// Merging all icons as `SPRITE_NAME/SPRITE_ICON_NAME`
type IconName = {
  // [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`;
  [Key in keyof SpritesMap]: `${SpritesMap[Key]}`;
}[keyof SpritesMap];

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName;
}

const Icon = ({ name, className, viewBox, ...props }: IconProps) => {
  return (
    <svg
      // We recommend to use specific component class for avoid collisions with other styles and simple override it
      className={clsx('c-icon', className)}
      viewBox={viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`/static/sprite.svg#${name}`} />
    </svg>
  );
};

export type { IconProps };
export { Icon };
