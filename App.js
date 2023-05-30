import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { ThemeProvider } from './src/context/Theme';
import { FontEditorProvider } from './src/context/FontEditor';
import { ChapterSaverProvider } from './src/context/ChapterSave';
import { VerseSaveProvider } from './src/context/VerseSave';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import { MenuProvider } from 'react-native-popup-menu';
import COLORS from './src/constants/color'


const App = () => {
  return (

    <SafeAreaProvider>
      <ThemeProvider>
        <FontEditorProvider>
          <ChapterSaverProvider>
            <VerseSaveProvider>
              {Platform.OS != 'ios' ? null : (
                <SafeAreaView style={{
                  flex: 0,
                  backgroundColor: COLORS.brown
                }} />
              )}
              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: Platform.OS != 'ios'
                    ? COLORS.safeAreaViewIOSColor : COLORS.white,
                }}>
                <MenuProvider>
                  <Navigation />
                </MenuProvider>
              </SafeAreaView>
            </VerseSaveProvider>
          </ChapterSaverProvider>
        </FontEditorProvider>
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
