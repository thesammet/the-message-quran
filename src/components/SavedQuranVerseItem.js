import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TYPOGRAPHY from '../constants/typography';
import { useTheme } from '@react-navigation/native';

const SavedQuranVerseItem = React.memo(({ item, navigation, quranChapters, bottomSheetRef, func }) => {
    const { chapter } = item;
    const matchingChapter = quranChapters.find((quranChapter) => quranChapter.id === chapter);
    const { COLORS } = useTheme();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('VerseDetail', {
                chapter: matchingChapter.id,
                chapter_name: matchingChapter.translation,
                chapter_total_verses: matchingChapter.total_verses,
                moved_item: item.verse
            })}>
            <View style={[styles.container, { borderColor: COLORS.borderColor }]}>
                <View style={styles.leftContainer}>
                    <Text style={[styles.subtitle, { color: COLORS.brown }, TYPOGRAPHY().H6Bold]}>
                        {item.verse}.
                    </Text>
                    <Text style={[styles.title, { color: COLORS.titleColor }, TYPOGRAPHY().H5Regular]}>
                        {item.text}
                    </Text>
                    {matchingChapter && (
                        <Text style={[styles.translation, { color: COLORS.verseColor }]}>
                            {matchingChapter.translation}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 16,
        paddingLeft: 8,
    },
    leftContainer: {
        flex: 5,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 16,
    },
    translation: {
        alignSelf: 'flex-start',
        fontSize: 14,
    },
});

export default SavedQuranVerseItem;
