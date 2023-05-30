import { DefaultTheme } from '@react-navigation/native';

const customDefaultTheme = {
  ...DefaultTheme,
  COLORS: {
    ...DefaultTheme.COLORS,
    brown: '#b07a1a',
    black: '#1C1C1C',
    lightBrown: '#fffbf2',
    white: 'white',
    tabbarBorderTop: 'transparent',
    tabbarBackgroundColor: '#fffbf2',
    borderColor: "#EAEAEA",
    titleColor: "#212121",
    subtitleColor: "#757575",
    verseColor: "#757575",
    settingsItemBorderBottomColor: "#ccc",
    settingsItemBorderBackgroundColor: "#f5f5f5",
    shadowColor: "#000",
    bottomSheetBackgroundColor: 'transparent',
    bgColor: '#fff',
    itemBg: '#fff'
  },
};

export default customDefaultTheme;
