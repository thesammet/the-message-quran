import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../constants/color';
import TYPOGRAPHY from '../constants/typography';

const QuranChapterItem = React.memo(({ item, navigation }) => {
    const [pressed, setPressed] = useState(false);
    const handleLongPress = () => {
        setPressed(true);
    };
    return (
        <TouchableOpacity
            onLongPress={handleLongPress}
            onPressOut={() => setPressed(false)}
            onPress={() => {
                navigation.navigate('VerseDetail', { chapter: item.id, chapter_name: item.translation })
            }}>
            <View style={[
                styles.container,
                { backgroundColor: pressed ? COLORS.brown : 'white' },
            ]}>
                <View style={styles.leftContainer}>
                    <Text style={[
                        { marginRight: item.id > 99 ? 3 : 0 },
                        styles.subtitle,
                        TYPOGRAPHY().H5Regular, { textAlign: 'center', minWidth: 30 }
                    ]}>{item.id}</Text>
                    <Text style={[styles.title, TYPOGRAPHY().H4Medium]}>{item.translation}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.verses}>{item.total_verses} verses</Text>
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
        borderColor: '#EAEAEA',
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    subtitle: {
        fontSize: 16,
        color: '#757575',
    },
    verses: {
        fontSize: 14,
        color: '#757575',
    }
})

export default QuranChapterItem;