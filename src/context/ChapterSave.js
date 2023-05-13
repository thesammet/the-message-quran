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
                    setSavedChapter(savedChapters);
                }
            } catch (error) {
                console.warn(error);
            }
        };
        savedChapterControl();
    }, []);

    const addValueSavedChapter = async value => {
        setSavedChapter([...savedChapter, value])
        try {
            await AsyncStorage.setItem('savedChapter', value);
        } catch (error) {
            console.warn(error);
        }
    };

    const removeValueSavedChapter = async value => {
        const newSavedChapter = savedChapter.filter(item => item !== value);
        setSavedChapter(newSavedChapter);
        try {
            await AsyncStorage.setItem('savedChapter', newSavedChapter);
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
            }}>
            {children}
        </ChapterSaverContext.Provider>
    );
};
