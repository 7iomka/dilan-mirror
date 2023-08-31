const linkComponent = () => {
  // var primaryColor = theme('colors.primary');

  return {
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
