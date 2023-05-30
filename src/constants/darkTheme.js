import { DarkTheme } from '@react-navigation/native';

const customDarkTheme = {
    ...DarkTheme,
    COLORS: {
        ...DarkTheme.COLORS,
        brown: '#572a0f',
        black: '#333333',
        lightBrown: '#4e4e4e',
        white: '#f2f2f2',
        tabbarBorderTop: 'transparent',
        tabbarBackgroundColor: '#4e4e4e',
        borderColor: '#333333',
        titleColor: '#f5f5f5',
        subtitleColor: '#f2f2f2',
        verseColor: '#f2f2f2',
        settingsItemBorderBottomColor: "#4e4e4e",
        settingsItemBorderBackgroundColor: "#333333",
        shadowColor: '#000',
        bottomSheetBackgroundColor: 'transparent',
        bgColor: '#333333',
        itemBg: '#4e4e4e'
    },
};

export default customDarkTheme;
