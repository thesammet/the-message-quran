import { DarkTheme } from '@react-navigation/native';

const customDarkTheme = {
    ...DarkTheme,
    COLORS: {
        ...DarkTheme.COLORS,
        brown: '#b07a1a',
        black: '#1C1C1C',
        lightBrown: '#fffbf2',
        white: 'white',
        tabbarBorderTop: 'transparent',
        tabbarBackgroundColor: '#000',
        borderColor: "#EAEAEA",
        titleColor: "white",
        subtitleColor: "#b07a1a",
        verseColor: "#FBFAF2",
        settingsItemBorderBottomColor: "#ccc",
        settingsItemBorderBackgroundColor: "#424242",
        shadowColor: "red",
        bottomSheetBackgroundColor: 'transparent',
        bgColor: '#000',
        itemBg: '#000',
        settingsItemTextColor: "#ededed",
        tabbarTitleColor: "#fff",
        tabbarPaleTitleColor: "#7a7a7a",
        tabbarIconColor: "#b07a1a",
        tabbarPaleIconColor: "#7a7a7a",
        verseAmountText: "#dddddd",
        disabledItem: "#4f4d4d"
    },
};

export default customDarkTheme;
