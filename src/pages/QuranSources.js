import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';

const QuranMealScreen = () => {
    // Quran meal data source
    const quranMealData = [
        { language: 'Uthmani Quran Text', source: 'The Noble Qur\'an Encyclopedia', link: "https://quranenc.com/en/home" },
        { language: 'English Transliteration', source: 'tanzil.net', link: "https://tanzil.net/trans/en.transliteration" },
        { language: 'Bengali Translation', source: 'Muhiuddin Khan (tanzil.net)', link: "https://tanzil.net/trans/bn.bengali" },
        { language: 'English Translation', source: 'Umm Muhammad (Saheeh International, tanzil.net)', link: "https://tanzil.net/trans/en.sahih" },
        { language: 'Spanish Translation', source: 'Muhammad Isa García (tanzil.net)', link: "https://tanzil.net/trans/es.garcia" },
        { language: 'French Translation', source: 'Muhammad Hamidullah (tanzil.net)', link: "https://tanzil.net/trans/fr.hamidullah" },
        { language: 'Indonesian Translation', source: 'Indonesian Islamic Affairs Ministry (The Noble Qur\'an Encyclopedia)', link: "https://quranenc.com/en/browse/indonesian_affairs" },
        { language: 'Russian Translation', source: 'Elmir Kuliev (tanzil.net)', link: "https://tanzil.net/trans/ru.kuliev" },
        { language: 'Swedish Translation', source: 'Knut Bernström (tanzil.net)', link: "https://tanzil.net/trans/sv.bernstrom" },
        { language: 'Turkish Translation', source: 'Turkish Directorate of Religious Affairs (tanzil.net)', link: "https://tanzil.net/trans/tr.diyanet" },
        { language: 'Urdu Translation', source: 'Abul A\'la Maududi (tanzil.net)', link: "https://tanzil.net/trans/ur.maududi" },
        { language: 'Chinese Translation', source: 'Muhammad Makin (The Noble Qur\'an Encyclopedia)', link: "https://quranenc.com/en/browse/chinese_makin" },
    ];

    const handlePress = useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            handlePress(item.link)
        }}
            style={{ marginBottom: 10 }}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.language}</Text>
                <Text style={{ fontSize: 14 }}>{item.source}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <FlatList
                data={quranMealData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
            />
        </View>
    );
};

export default QuranMealScreen;
