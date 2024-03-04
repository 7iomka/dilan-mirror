import { type SpritesMap } from './sprite.gen';

export type IconName = {
  [Key in keyof SpritesMap]: `${SpritesMap[Key]}`;
}[keyof SpritesMap];
