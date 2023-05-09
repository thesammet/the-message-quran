import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { ThemeProvider } from './src/context/Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import { MenuProvider } from 'react-native-popup-menu';
import COLORS from './src/constants/color'
import { MD2LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const App = () => {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
    },
  };
  return (

    <SafeAreaProvider>
      <ThemeProvider>
        {Platform.OS != 'ios' ? null : (
          <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.brown }} />
        )}
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Platform.OS != 'ios' ? '#00AAFF' : 'white',
          }}>
          <MenuProvider>
            <PaperProvider theme={theme}>
              <Navigation />
            </PaperProvider>
          </MenuProvider>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
