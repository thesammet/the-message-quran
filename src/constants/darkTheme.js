import { DarkTheme } from '@react-navigation/native';

const customDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        brown: '#b07a1a',
        black: '#1C1C1C',
        lightBrown: '#fffbf2'
    },
};

export default customDarkTheme;
