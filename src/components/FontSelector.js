import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import TYPOGRAPHY from '../constants/typography';
import { useContext } from 'react';
import { FontEditorContext } from '../context/FontEditor';
import { useTheme } from '@react-navigation/native';
import { strings } from '../utils/localization';

const FontSelector = () => {
  const { size, updateSize } = useContext(FontEditorContext);
  const { COLORS } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.valuesContainer}>
        <TouchableOpacity onPress={() => {
          updateSize('0.8')
        }}>
          <Text style={size === "0.8" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [{ color: COLORS.titleColor }, TYPOGRAPHY().H5Medium]}>{strings.small}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          updateSize('1')
        }}>
          <Text style={size === "1" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [{ color: COLORS.titleColor }, TYPOGRAPHY().H5Medium]}>{strings.normal}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          updateSize('1.2')
        }}>
          <Text style={size === "1.2" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [{ color: COLORS.titleColor }, TYPOGRAPHY().H5Medium]}>{strings.mid}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          updateSize('1.4')
        }}>
          <Text style={size === "1.4" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [{ color: COLORS.titleColor }, TYPOGRAPHY().H5Medium]}>{strings.big}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valuesContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});

export default FontSelector;
