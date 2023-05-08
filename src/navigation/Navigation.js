import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/Auth';
import { ThemeContext } from '../context/Theme';
import DefaultTheme from '../constants/defaultTheme';
import DarkTheme from '../constants/darkTheme';
import Tabs from './Tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const { theme } = useContext(ThemeContext);
    return (
        <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
            <View style={styles.container}>{<Tabs />}</View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

export default Navigation;
