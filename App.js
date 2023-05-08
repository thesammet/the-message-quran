

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import COLORS from './src/constants/color'
import TYPOGRAPHY from './src/constants/typography'



function App() {


  return (
    <Text style={[TYPOGRAPHY.H4Bold, { color: COLORS.brown, alignSelf: 'center', marginTop: 24 }]}>Initial structure for The Message: Quran</Text>
  );
}


export default App;
