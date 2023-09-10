const linkComponent = () => {
  // var primaryColor = theme('colors.primary');

  return {
    // @apply select-none fill-current w-[1em] h-[1em] inline-block text-inherit box-content;
    '.c-icon': {
      userSelect: 'none',
      fill: 'currentColor',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      color: 'inherit',
      flexShrink: '0',
    },
    '.c-link': {
      transitionProperty: 'color, opacity, transform',
      transitionDuration: '200ms',
      cursor: 'pointer',

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    },
  };
};

export const customComponents = [linkComponent];
