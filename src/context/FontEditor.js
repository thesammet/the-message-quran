import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FontEditorContext = createContext();

export const FontEditorProvider = ({ children }) => {
    const [size, setSize] = useState(null);

    useEffect(() => {
        const sizeControl = async () => {
            try {
                const size = await AsyncStorage.getItem('size');

                if (size) {
                    setSize(size);
                } else {
                    setSize("1")
                }
            } catch (error) {
                console.warn(error);
            }
        };
        sizeControl();
    }, []);

    const updateSize = async value => {
        setSize(value);
        try {
            await AsyncStorage.setItem('size', value);
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <FontEditorContext.Provider
            value={{
                size,
                updateSize
            }}>
            {children}
        </FontEditorContext.Provider>
    );
};
