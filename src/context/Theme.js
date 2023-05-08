import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const themeControl = async () => {
            try {
                const theme = await AsyncStorage.getItem('theme');
                if (theme) {
                    setTheme(theme);
                }
            } catch (error) {
                console.warn(error);
            }
        };
        themeControl();
    }, []);

    const changeTheme = async value => {
        setTheme(value);
        try {
            await AsyncStorage.setItem('theme', value);
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
