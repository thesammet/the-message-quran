import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VerseSaveContext = createContext();

export const VerseSaveProvider = ({ children }) => {
    const [savedVerses, setSavedVerses] = useState([]);

    useEffect(() => {
        const savedVersesControl = async () => {
            try {
                const savedVersesString = await AsyncStorage.getItem('savedVerses');
                if (savedVersesString) {
                    setSavedVerses(JSON.parse(savedVersesString));
                }
            } catch (error) {
                console.warn(error);
            }
        };
        savedVersesControl();
    }, []);

    const addSavedVerse = async (verse, chapter) => {
        const newSavedVerses = [...savedVerses, { verse, chapter }];
        setSavedVerses(newSavedVerses);
        try {
            await AsyncStorage.setItem('savedVerses', JSON.stringify(newSavedVerses));
        } catch (error) {
            console.warn(error);
        }
    };

    const removeSavedVerse = async (verse, chapter) => {
        const newSavedVerses = savedVerses.filter(
            (item) => item.verse !== verse || item.chapter !== chapter
        );
        setSavedVerses(newSavedVerses);
        try {
            await AsyncStorage.setItem('savedVerses', JSON.stringify(newSavedVerses));
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <VerseSaveContext.Provider
            value={{
                savedVerses,
                addSavedVerse,
                removeSavedVerse
            }}
        >
            {children}
        </VerseSaveContext.Provider>
    );
};
