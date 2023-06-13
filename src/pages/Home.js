import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { getLocales } from 'react-native-localize';
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
import { useTheme } from '@react-navigation/native';
import TYPOGRAPHY from '../constants/typography';
import { Quran } from '../image/index';
import { strings } from '../utils/localization';

const Home = ({ navigation }) => {
    const [quranChapters, setQuranChapters] = useState(quranChaptersEN);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuranChapters, setFilteredQuranChapters] = useState(quranChapters);
    const { COLORS } = useTheme();

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
        <View style={[styles.outerContainer, { backgroundColor: COLORS.bgColor }]}>
            <View style={[styles.searchHeader, { backgroundColor: COLORS.brown }]}>
                <TextInput
                    placeholder={strings.searchChapterHint}
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
            {
                filteredQuranChapters && filteredQuranChapters.length > 0 ?
                    <FlatList
                        data={filteredQuranChapters}
                        renderItem={({ item }) =>
                            <QuranChapterItem
                                item={item}
                                navigation={navigation} />}
                        keyExtractor={(item) => item.id}
                    /> :
                    <View>
                        <Text style={[styles.noText, { color: COLORS.brown }, TYPOGRAPHY.apply().H4Bold]}>Chapter could'nt find.</Text>
                        <Image source={Quran}
                            style={{
                                height: 145,
                                width: 225,
                                alignSelf: 'center',
                                marginTop: 8
                            }} />
                    </View>
            }

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
    searchHeader: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    noText: {
        textAlign: 'center',
        marginTop: 64
    },
})

export default Home;