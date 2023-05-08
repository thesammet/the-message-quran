import { DefaultTheme } from '@react-navigation/native';

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    brown: 'red',
    black: 'yellow',
    lightBrown: 'green'
  },
};

export default customDefaultTheme;
