import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import COLORS from '../constants/color';
import TYPOGRAPHY from '../constants/typography';
import { useContext } from 'react';
import { FontEditorContext } from '../context/FontEditor';

const FontSelector = ({ onValueChange }) => {
  const { size, updateSize } = useContext(FontEditorContext);
  return (
    <View style={styles.container}>
      <View style={styles.valuesContainer}>
        <TouchableOpacity onPress={() => {
          onValueChange(.8)
          updateSize('.8')
        }}>
          <Text style={size === "0.8" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [COLORS.black, TYPOGRAPHY().H5Medium]}>Small</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          onValueChange(1)
          updateSize('1')
        }}>
          <Text style={size === "1" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [COLORS.black, TYPOGRAPHY().H5Medium]}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          onValueChange(1.2)
          updateSize('1.2')
        }}>
          <Text style={size === "1.2" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [COLORS.black, TYPOGRAPHY().H5Medium]}>Mid</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          onValueChange(1.4)
          updateSize('1.4')
        }}>
          <Text style={size === "1.4" ? [{ color: COLORS.brown }, TYPOGRAPHY().H5Bold] : [COLORS.black, TYPOGRAPHY().H5Medium]}>Big</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  valuesContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 10,
    alignItems: 'center'
  }
});

export default FontSelector;
