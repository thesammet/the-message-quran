import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { strings } from '../utils/localization';

const QuranMealScreen = () => {
    const { COLORS } = useTheme();
    // Quran meal data source
    const quranMealData = [
        { language: `Uthmani Quran Text`, source: 'The Noble Qur\'an Encyclopedia', link: "https://quranenc.com/en/home" },
        { language: `English ${strings.translation}`, source: 'tanzil.net', link: "https://tanzil.net/trans/en.transliteration" },
        { language: `Bengali ${strings.translation}`, source: 'Muhiuddin Khan (tanzil.net)', link: "https://tanzil.net/trans/bn.bengali" },
        { language: `English ${strings.translation}`, source: 'Umm Muhammad (Saheeh International, tanzil.net)', link: "https://tanzil.net/trans/en.sahih" },
        { language: `Spanish ${strings.translation}`, source: 'Muhammad Isa García (tanzil.net)', link: "https://tanzil.net/trans/es.garcia" },
        { language: `French ${strings.translation}`, source: 'Muhammad Hamidullah (tanzil.net)', link: "https://tanzil.net/trans/fr.hamidullah" },
        { language: `Indonesian ${strings.translation}`, source: 'Indonesian Islamic Affairs Ministry (The Noble Qur\'an Encyclopedia)', link: "https://quranenc.com/en/browse/indonesian_affairs" },
        { language: `Russian ${strings.translation}`, source: 'Elmir Kuliev (tanzil.net)', link: "https://tanzil.net/trans/ru.kuliev" },
        { language: `Swedish ${strings.translation}`, source: 'Knut Bernström (tanzil.net)', link: "https://tanzil.net/trans/sv.bernstrom" },
        { language: `Turkish ${strings.translation}`, source: 'Turkish Directorate of Religious Affairs (tanzil.net)', link: "https://tanzil.net/trans/tr.diyanet" },
        { language: `Urdu ${strings.translation}`, source: 'Abul A\'la Maududi (tanzil.net)', link: "https://tanzil.net/trans/ur.maududi" },
        { language: `Chinese ${strings.translation}`, source: 'Muhammad Makin (The Noble Qur\'an Encyclopedia)', link: "https://quranenc.com/en/browse/chinese_makin" },
    ];

    const handlePress = useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`${strings.dontKnowHowOpen}: ${url}`);
        }
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            handlePress(item.link)
        }}
            style={{ marginBottom: 10 }}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.titleColor }}>{item.language}</Text>
                <Text style={{ fontSize: 14, color: COLORS.subtitleColor }}>{item.source}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[{ backgroundColor: COLORS.bgColor },
        styles.fullFlex]}>
            <FlatList
                data={quranMealData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fullFlex: {
        flex: 1,
        alignItems: 'center'
    }
})

export default QuranMealScreen;
