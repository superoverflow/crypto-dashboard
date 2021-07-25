import swiss from "@theme-ui/preset-swiss";

const custom = {
  ...swiss,
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text',
      }
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
  },
  styles: {
    ...swiss.styles,
  },
};

export default custom;
