import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getLocales } from 'react-native-localize';
import COLORS from '../constants/color';
import TYPOGRAPHY from '../constants/typography';
import CustomHeader from '../components/CustomHeader';
import quranChaptersBN from '../assets/source/chapters/bn.json';
import quranChaptersEN from '../assets/source/chapters/en.json';
import quranChaptersES from '../assets/source/chapters/es.json';
import quranChaptersFR from '../assets/source/chapters/fr.json';
import quranChaptersID from '../assets/source/chapters/id.json';
import quranChaptersRU from '../assets/source/chapters/ru.json';
import quranChaptersSV from '../assets/source/chapters/sv.json';
import quranChaptersTR from '../assets/source/chapters/tr.json';
import quranChaptersUR from '../assets/source/chapters/ur.json';
import quranChaptersZH from '../assets/source/chapters/zh.json';
import { TextInput } from 'react-native-paper';
const Home = ({ navigation }) => {
    const [quranChapters, setQuranChapters] = useState(quranChaptersEN);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuranChapters, setFilteredQuranChapters] = useState(quranChapters);

    const getDeviceLanguage = () => {
        const locales = getLocales();
        const deviceLanguage = locales[0].languageCode;
        return deviceLanguage;
    };

    const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase();
        const filteredData = quranChapters.filter((chapter) => {
            return chapter.translation.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(formattedQuery);
        });
        setFilteredQuranChapters(filteredData);
        setSearchQuery(text);
    };

    const handleLangChange = (lang) => {
        let chapters;

        switch (lang) {
            case 'bn':
                chapters = quranChaptersBN;
                break;
            case 'en':
                chapters = quranChaptersEN;
                break;
            case 'es':
                chapters = quranChaptersES;
                break;
            case 'fr':
                chapters = quranChaptersFR;
                break;
            case 'id':
                chapters = quranChaptersID;
                break;
            case 'ru':
                chapters = quranChaptersRU;
                break;
            case 'sv':
                chapters = quranChaptersSV;
                break;
            case 'tr':
                chapters = quranChaptersTR;
                break;
            case 'ur':
                chapters = quranChaptersUR;
                break;
            case 'zh':
                chapters = quranChaptersZH;
                break;
            default:
                chapters = quranChaptersEN;
        }
        setQuranChapters(chapters);
        setFilteredQuranChapters(chapters);
    };

    useEffect(() => {
        const deviceLanguage = getDeviceLanguage();
        handleLangChange(deviceLanguage);
    }, []);


    const QuranChapterItem = ({ item }) => {
        const [pressed, setPressed] = useState(false);
        const handleLongPress = () => {
            setPressed(true);
        };
        return (
            <TouchableOpacity
                onLongPress={handleLongPress}
                onPressOut={() => setPressed(false)}
                onPress={() => {
                    navigation.navigate('VerseDetail', { chapter: item.id })
                }}>
                <View style={[
                    styles.container,
                    { backgroundColor: pressed ? COLORS.brown : 'white' },
                ]}>
                    <View style={styles.leftContainer}>
                        <Text style={[
                            { marginRight: item.id > 99 ? 3 : 0 },
                            styles.subtitle,
                            TYPOGRAPHY.H5Regular, { textAlign: 'center', minWidth: 30 }
                        ]}>{item.id}</Text>
                        <Text style={[styles.title, TYPOGRAPHY.H4Medium]}>{item.translation}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.verses}>{item.total_verses} verses</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    };

    return (
        <View style={styles.outerContainer}>
            <TextInput
                placeholder="Search for a chapter.."
                onChangeText={handleSearch}
                value={searchQuery}
                backgroundColor={COLORS.lightBrown}
                mode="flat"
                activeUnderlineColor={COLORS.brown}

            />
            <View style={styles.fullFlex}>
                <View
                    style={styles.fullFlex}>
                    {
                        <FlatList
                            data={filteredQuranChapters}
                            renderItem={({ item }) => <QuranChapterItem item={item} />}
                            keyExtractor={(item) => item.id}
                            style={styles.list}
                        />
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    fullFlex: {
        flex: 1
    },
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
    header: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
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
    type: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 4,
    },
    verses: {
        fontSize: 14,
        color: '#757575',
    },
    list: {
        backgroundColor: '#fff',
    },
})

export default Home;