import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getLocales } from 'react-native-localize';
import COLORS from '../constants/color';
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
import { Search } from '../components/icons';
import QuranChapterItem from '../components/QuranChapter';

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

    return (
        <View style={styles.outerContainer}>
            <View style={styles.searchHeader}>
                <TextInput
                    placeholder="Search for a chapter.."
                    onChangeText={handleSearch}
                    value={searchQuery}
                    mode="outlined"
                    activeUnderlineColor={'red'}
                    activeOutlineColor={COLORS.brown}
                    theme={{
                        colors: {
                            placeholder: COLORS.brown,
                            background: COLORS.lightBrown
                        },
                        roundness: 24
                    }}
                    style={{ flex: 1 }}
                />
                <Search width={32} height={32} />
            </View>
            <View style={styles.fullFlex}>
                <View
                    style={styles.fullFlex}>
                    {
                        <FlatList
                            data={filteredQuranChapters}
                            renderItem={({ item }) =>
                                <QuranChapterItem
                                    item={item}
                                    navigation={navigation} />}
                            keyExtractor={(item) => item.id}
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
    searchHeader: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: COLORS.brown,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default Home;