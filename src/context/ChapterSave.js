import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChapterSaverContext = createContext();

export const ChapterSaverProvider = ({ children }) => {
    const [savedChapter, setSavedChapter] = useState([]);

    useEffect(() => {
        const savedChapterControl = async () => {
            try {
                const savedChapters = await AsyncStorage.getItem('savedChapter');

                if (savedChapters) {
                    setSavedChapter(JSON.parse(savedChapters)); // Parse the string to an array
                }
            } catch (error) {
                console.warn(error);
            }
        };
        savedChapterControl();
    }, []);

    const addValueSavedChapter = async (value) => {
        const newSavedChapter = [...savedChapter, value];
        setSavedChapter(newSavedChapter);
        try {
            await AsyncStorage.setItem('savedChapter', JSON.stringify(newSavedChapter)); // Stringify the array
        } catch (error) {
            console.warn(error);
        }
    };

    const removeValueSavedChapter = async (value) => {
        let newSavedChapter = [];
        const index = savedChapter.indexOf(value);
        if (index > -1) {
            newSavedChapter = [...savedChapter];
            newSavedChapter.splice(index, 1);
            setSavedChapter(newSavedChapter);
        }
        try {
            await AsyncStorage.setItem('savedChapter', JSON.stringify(newSavedChapter)); // Stringify the array
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <ChapterSaverContext.Provider
            value={{
                savedChapter,
                addValueSavedChapter,
                removeValueSavedChapter
            }}
        >
            {children}
        </ChapterSaverContext.Provider>
    );
};
