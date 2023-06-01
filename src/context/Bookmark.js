import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
    const [bookmark, setBookmark] = useState(null);

    useEffect(() => {
        const bookmarkControl = async () => {
            try {
                const bookmarkString = await AsyncStorage.getItem('bookmark');
                if (bookmarkString) {
                    setBookmark(JSON.parse(bookmarkString));
                }
            } catch (error) {
                console.warn(error);
            }
        };
        bookmarkControl();
    }, []);

    const saveBookmark = async (chapter, chapter_name, chapter_total_verses, moved_item) => {
        const newBookmark = {
            chapter,
            chapter_name,
            chapter_total_verses,
            moved_item
        };
        setBookmark(newBookmark);
        try {
            await AsyncStorage.setItem('bookmark', JSON.stringify(newBookmark));
        } catch (error) {
            console.warn(error);
        }
    };

    const removeBookmark = async () => {
        setBookmark(null);
        try {
            await AsyncStorage.removeItem('bookmark');
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <BookmarkContext.Provider
            value={{
                bookmark,
                saveBookmark,
                removeBookmark
            }}
        >
            {children}
        </BookmarkContext.Provider>
    );
};
