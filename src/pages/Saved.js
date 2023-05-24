import React, { useContext, useEffect, useState } from 'react';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { StyleSheet, Text, View, FlatList, Image, } from 'react-native';
import TYPOGRAPHY from '../constants/typography';
import COLORS from '../constants/color';
import { getLocales } from 'react-native-localize';
import { ChapterSaverContext } from '../context/ChapterSave';
import { VerseSaveContext } from '../context/VerseSave';
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
import quranVersesBN from '../assets/source/editions/bn.json';
import quranVersesEN from '../assets/source/editions/en.json';
import quranVersesES from '../assets/source/editions/es.json';
import quranVersesFR from '../assets/source/editions/fr.json';
import quranVersesID from '../assets/source/editions/id.json';
import quranVersesRU from '../assets/source/editions/ru.json';
import quranVersesSV from '../assets/source/editions/sv.json';
import quranVersesTR from '../assets/source/editions/tr.json';
import quranVersesUR from '../assets/source/editions/ur.json';
import quranVersesZH from '../assets/source/editions/zh.json';
import QuranChapterItem from '../components/QuranChapter';
import SavedQuranVerseItem from '../components/SavedQuranVerseItem';
import { Quran } from '../image/index';

const Saved = ({ navigation }) => {
    const [quranChapters, setQuranChapters] = useState(quranChaptersEN);
    const [quranVerses, setQuranVerses] = useState(quranVersesEN);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [filteredVerses, setFilteredVerses] = useState([]);
    const { savedChapter } = useContext(ChapterSaverContext);
    const { savedVerses } = useContext(VerseSaveContext);

    const getDeviceLanguage = () => {
        const locales = getLocales();
        const deviceLanguage = locales[0].languageCode;
        return deviceLanguage;
    };

    const handleLangChange = (lang) => {
        let chapters;
        let verses;
        switch (lang) {
            case 'bn':
                chapters = quranChaptersBN;
                verses = quranVersesBN;
                break;
            case 'en':
                chapters = quranChaptersEN;
                verses = quranVersesEN;
                break;
            case 'es':
                chapters = quranChaptersES;
                verses = quranVersesES;
                break;
            case 'fr':
                chapters = quranChaptersFR;
                verses = quranVersesFR;
                break;
            case 'id':
                chapters = quranChaptersID;
                verses = quranVersesID;
                break;
            case 'ru':
                chapters = quranChaptersRU;
                verses = quranVersesRU;
                break;
            case 'sv':
                chapters = quranChaptersSV;
                verses = quranVersesSV;
                break;
            case 'tr':
                chapters = quranChaptersTR;
                verses = quranVersesTR;
                break;
            case 'ur':
                chapters = quranChaptersUR;
                verses = quranVersesUR;
                break;
            case 'zh':
                chapters = quranChaptersZH;
                verses = quranVersesZH;
                break;
            default:
                chapters = quranChaptersEN;
                verses = quranVersesEN;
        }
        setQuranChapters(chapters);
        setQuranVerses(verses);
    };


    function findMatchingChapters(savedChapters, quranChapters) {
        const matchingChapters = [];

        if (!savedChapters || !quranChapters) {
            return matchingChapters;
        }

        savedChapters.forEach(savedChapter => {
            const matchingChapter = quranChapters.find(quranChapter => quranChapter.id.toString() === savedChapter);

            if (matchingChapter) {
                matchingChapters.push(matchingChapter);
            }
        });

        return matchingChapters;
    }

    function findMatchingVerses(savedVerses, quranVerses) {
        const matchingVerses = [];

        if (!savedVerses || !quranVerses) {
            return matchingVerses;
        }

        savedVerses.forEach(savedVerse => {
            const { chapter, verse } = savedVerse;

            const matchingChapter = quranVerses[chapter];
            if (matchingChapter) {
                const matchingVerse = matchingChapter.find(quranVerse =>
                    quranVerse.verse === verse
                );

                if (matchingVerse) {
                    matchingVerses.push(matchingVerse);
                }
            }
        });

        return matchingVerses;
    }

    useEffect(() => {
        const deviceLanguage = getDeviceLanguage();
        handleLangChange(deviceLanguage);
        const matchingChapters = findMatchingChapters(savedChapter, quranChapters);
        const matchingVerses = findMatchingVerses(savedVerses, quranVerses)
        setFilteredVerses(matchingVerses)
        setFilteredChapters(matchingChapters);
    }, [savedChapter,
        quranChapters,
        savedVerses,
        quranVerses]);

    const Tab1 = () =>
        <View
            style={styles.fullFlex}>
            {
                (filteredChapters.length == 0 ?
                    <View>
                        <Text style={[styles.noText, TYPOGRAPHY.apply().H4Bold]}>No Saved Chapter</Text>
                        <Image source={Quran}
                            style={{
                                height: 145,
                                width: 225,
                                alignSelf: 'center',
                                marginTop: 8
                            }} />
                    </View>
                    :
                    <FlatList
                        data={filteredChapters}
                        renderItem={({ item }) =>
                            <QuranChapterItem
                                item={item}
                                navigation={navigation} />}
                        keyExtractor={(item) => item.id}
                    />
                )
            }
        </View>;

    const Tab2 = () => (
        <View style={styles.fullFlex}>
            {filteredVerses.length === 0 ? (
                <View>
                    <Text style={[styles.noText, TYPOGRAPHY.apply().H4Bold]}>
                        No Saved Verse
                    </Text>
                    <Image
                        source={Quran}
                        style={{
                            height: 145,
                            width: 225,
                            alignSelf: 'center',
                            marginTop: 8,
                        }}
                    />
                </View>
            ) : (
                <FlatList
                    data={filteredVerses}
                    renderItem={({ item }) => (
                        <SavedQuranVerseItem
                            item={item}
                            navigation={navigation}
                            quranChapters={quranChapters} // Use quranChapters instead of filteredChapters
                        />
                    )}
                    keyExtractor={(item) => item.text}
                />
            )}
        </View>
    );


    return (
        <ScrollableTabView
            renderTabBar={() => <ScrollableTabBar />}
            tabBarBackgroundColor={COLORS.brown}
            tabBarActiveTextColor={COLORS.lightBrown}
            tabBarInactiveTextColor={COLORS.black}
            tabBarTextStyle={TYPOGRAPHY().H4Medium}
            tabBarUnderlineStyle={{ backgroundColor: COLORS.white, }}
        >
            <Tab1 tabLabel='Chapter' />
            <Tab2 tabLabel='Verse' />
        </ScrollableTabView>
    );
}

const styles = StyleSheet.create({
    fullFlex: {
        flex: 1,
    },
    noText: {
        color: COLORS.brown,
        textAlign: 'center',
        marginTop: 64
    }
})

export default Saved;