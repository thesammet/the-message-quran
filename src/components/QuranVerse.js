import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TYPOGRAPHY from '../constants/typography';
import { useTheme } from '@react-navigation/native';

const QuranVerseItem = React.memo(({ item, navigation }) => {
    const { COLORS } = useTheme();

    return (
        <TouchableOpacity onPress={() => {
            setSelectedItem(item);
            bottomSheet.current.show()
        }}>
            <View style={[
                styles.container,
                { borderColor: COLORS.borderColor }
            ]}>
                <View style={styles.leftContainer}>
                    <Text style={[styles.subtitle, { color: COLORS.brown }, TYPOGRAPHY().H6Bold]}>{item.verse}.</Text>
                    <Text style={[styles.title, { color: COLORS.titleColor }, TYPOGRAPHY().H5Regular]}>{item.text}</Text>
                </View>
            </View>
        </TouchableOpacity>
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
})

export default QuranVerseItem;