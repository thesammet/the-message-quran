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
            })}
            activeOpacity={.6}>
            <View style={[styles.container, { borderColor: COLORS.borderColor }]}>
                <View style={styles.leftContainer}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <Text style={[styles.subtitle, { color: COLORS.brown }, TYPOGRAPHY().H5Regular]}>
                            {item.verse}. verse -
                        </Text>
                        {matchingChapter && (
                            <Text style={[TYPOGRAPHY().H5Regular, { color: COLORS.verseColor }]}>
                                {" " + matchingChapter.translation}
                            </Text>
                        )}
                    </View>
                    <Text style={[{ color: COLORS.titleColor }, TYPOGRAPHY().H5Medium]}>
                        {item.text}
                    </Text>
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
});

export default SavedQuranVerseItem;
