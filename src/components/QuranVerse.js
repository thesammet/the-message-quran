import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/color';
import TYPOGRAPHY from '../constants/typography';

const QuranVerseItem = React.memo(({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => {
            setSelectedItem(item);
            bottomSheet.current.show()
        }}>
            <View style={[
                styles.container
            ]}>
                <View style={styles.leftContainer}>
                    <Text style={[styles.subtitle, TYPOGRAPHY().H6Bold]}>{item.verse}.</Text>
                    <Text style={[styles.title, TYPOGRAPHY().H5Regular]}>{item.text}</Text>
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
        borderColor: '#EAEAEA',
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
        color: '#212121',
    },
    subtitle: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 16,
        color: COLORS.brown,
    },
})

export default QuranVerseItem;