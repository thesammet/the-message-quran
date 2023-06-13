import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TYPOGRAPHY from '../constants/typography';
import { useTheme } from '@react-navigation/native';
import { strings } from '../utils/localization';

const QuranChapterItem = React.memo(({ item, navigation }) => {
    const { COLORS } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {
                navigation.navigate('VerseDetail', {
                    chapter: item.id,
                    chapter_name: item.translation,
                    chapter_total_verses: item.total_verses,
                    moved_item: 1
                })
            }}>
            <View style={[
                styles.container,
                { borderColor: COLORS.borderColor },
            ]}>
                <View style={styles.leftContainer}>
                    <Text style={[
                        { marginRight: item.id > 99 ? 3 : 0 },
                        styles.subtitle,
                        { color: COLORS.subtitleColor },
                        TYPOGRAPHY().H5Regular,
                        {
                            textAlign: 'center',
                            minWidth: 30
                        }
                    ]}>{item.id}.</Text>
                    <Text style={[styles.title, { color: COLORS.titleColor }, TYPOGRAPHY().H4Medium]}>{item.translation}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={[styles.verses, { color: COLORS.verseColor }]}>{item.total_verses} {strings.verses}</Text>
                </View>
            </View>
        </TouchableOpacity >
    )
});

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 16,
        paddingLeft: 8
    },
    leftContainer: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        alignItems: 'flex-end',
        flex: 2
    },
})

export default QuranChapterItem;