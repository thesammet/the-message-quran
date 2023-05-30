import { DarkTheme } from '@react-navigation/native';

const customDarkTheme = {
    ...DarkTheme,
    COLORS: {
        ...DarkTheme.COLORS,
        brown: '#b07a1a',
        black: '#1C1C1C',
        lightBrown: '#fffbf2',
        white: 'white',
        tabbarBorderTop: 'white',
        tabbarBackgroundColor: '#1C1C1C',
    },
};

export default customDarkTheme;
