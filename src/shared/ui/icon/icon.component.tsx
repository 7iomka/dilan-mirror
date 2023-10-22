import clsx from 'clsx';
import type { SVGProps } from 'react';
import { SPRITES_META, type SpritesMap } from './sprite.gen';

type IconName = {
  [Key in keyof SpritesMap]: `${SpritesMap[Key]}`;
}[keyof SpritesMap];

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const { viewBox, filePath, iconName, axis } = getIconMeta(name);
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
      <use href={`/static/sprites/${filePath}#${iconName}`} />
    </svg>
  );
};

/**
 * A function to get and process icon metadata.
 * It was moved out of the Icon component to prevent type inference issues.
 */
const getIconMeta = (iconName: IconName) => {
  const {
    filePath,
    items: {
      [iconName]: { viewBox, width, height },
    },
  } = SPRITES_META.sprite;
  const axis = width === height ? 'xy' : width > height ? 'x' : 'y';

  return { filePath, iconName, viewBox, axis };
};

export type { IconProps };
export { Icon };
