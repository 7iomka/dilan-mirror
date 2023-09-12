import clsx from 'clsx';

interface ResponsivePictureProps {
  srcWithoutExtension: string;
  extension?: 'jpg' | 'png';
  className?: string;
  objectFit?: 'cover' | 'contain';
  classNames?: {
    root?: string;
    img?: string;
  };
}

const ResponsivePicture = ({
  className,
  objectFit = 'cover',
  classNames,
  srcWithoutExtension: src,
  extension = 'jpg',
}: ResponsivePictureProps) => {
  return (
    <div
      className={clsx(
        'lazy-mediabox',
        objectFit === 'contain' && 'lazy-mediabox--contain',
        className,
        classNames?.root,
      )}
    >
      <picture>
        {/* <source
          data-srcset={`
            ${src}-lg.${extension},
            ${src}-lg@1.5x.${extension} 1.5x,
            ${src}-lg@2x.${extension} 2x,
            ${src}-lg@3x.${extension} 3x`}
          media="(min-width: 768px)"
        /> */}
        <img
          className={clsx('lazy-mediabox-img lazyload', classNames?.img)}
          data-lowsrc={`${src}@low.${extension}`}
          data-srcset={`
            ${src}.${extension},
            ${src}@1.5x.${extension} 1.5x,
            ${src}@2x.${extension} 2x,
            ${src}@3x.${extension} 3x`}
          alt=""
        />
        <noscript>
          <picture>
            {/* <source
              data-srcset={`
                ${src}-lg.${extension},
                ${src}-lg@1.5x.${extension} 1.5x,
                ${src}-lg@2x.${extension} 2x,
                ${src}-lg@3x.${extension} 3x`}
              media="(min-width: 768px)"
            /> */}
            <img
              className={clsx('lazy-mediabox-img lazyloaded', classNames?.img)}
              src={`${src}@3x.${extension}`}
              srcSet={`
                ${src}.${extension},
                ${src}@1.5x.${extension} 1.5x,
                ${src}@2x.${extension} 2x,
                ${src}@3x.${extension} 3x`}
              alt=""
            />
          </picture>
        </noscript>
      </picture>
    </div>
  );
};

export type { ResponsivePictureProps };
export { ResponsivePicture };
