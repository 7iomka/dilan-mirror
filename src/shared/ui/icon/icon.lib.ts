import type { IconName } from './icon.types';
import { SPRITES_META } from './sprite.gen';

/**
 * A function to get and process icon metadata.
 * It was moved out of the Icon component to prevent type inference issues.
 */
export const getIconMeta = (iconName: IconName) => {
  const {
    filePath,
    items: {
      [iconName]: { viewBox, width, height },
    },
  } = SPRITES_META.sprite;
  const axis = width === height ? 'xy' : width > height ? 'x' : 'y';

  return { filePath, iconName, viewBox, axis };
};

export const SPRITE_PATH = `/static/sprites/${SPRITES_META.sprite.filePath}`;

export const isIconExist = (iconName: string): iconName is IconName =>
  iconName in SPRITES_META.sprite.items;
