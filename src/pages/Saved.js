import React, { useContext, useEffect, useState } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import TYPOGRAPHY from '../constants/typography';
import COLORS from '../constants/color';
import { getLocales } from 'react-native-localize';
import { ChapterSaverContext } from '../context/ChapterSave';
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
import QuranChapterItem from '../components/QuranChapter';

const Saved = ({ navigation }) => {
    const [quranChapters, setQuranChapters] = useState(quranChaptersEN);
    const [filteredChatpers, setFilteredChapters] = useState([])
    const { savedChapter } = useContext(ChapterSaverContext);

    const getDeviceLanguage = () => {
        const locales = getLocales();
        const deviceLanguage = locales[0].languageCode;
        return deviceLanguage;
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
    };

    function findMatchingChapters(savedChapters, quranChapters) {
        const matchingChapters = [];

        if (!savedChapters || !quranChapters) {
            return matchingChapters; // Return an empty array if either array is empty or undefined
        }

        savedChapters.forEach(savedChapter => {
            const matchingChapter = quranChapters.find(quranChapter => quranChapter.id.toString() === savedChapter);

            if (matchingChapter) {
                matchingChapters.push(matchingChapter);
            }
        });

        return matchingChapters;
    }

    useEffect(() => {
        const deviceLanguage = getDeviceLanguage();
        handleLangChange(deviceLanguage);
        const matchingChapters = findMatchingChapters(savedChapter, quranChapters);
        setFilteredChapters(matchingChapters);
    }, [savedChapter, quranChapters]);

    const Tab1 = () =>
        <View style={styles.fullFlex}>
            <View
                style={styles.fullFlex}>
                {
                    <FlatList
                        data={filteredChatpers}
                        renderItem={({ item }) =>
                            <QuranChapterItem
                                item={item}
                                navigation={navigation} />}
                        keyExtractor={(item) => item.id}
                    />
                }
            </View>
        </View>;
    const Tab2 = () => <View><Text>Verses</Text></View>;
    return (
        <ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarBackgroundColor={COLORS.lightBrown}
            tabBarActiveTextColor={COLORS.brown}
            tabBarInactiveTextColor={COLORS.black}
            tabBarTextStyle={{ fontSize: 16 }}
        >
            <Tab1 tabLabel='Chapter' />
            <Tab2 tabLabel='Verse' />
        </ScrollableTabView>
    );
}

const styles = StyleSheet.create({
    fullFlex: {
        flex: 1,
        backgroundColor: 'white'
    },
})

export default Saved;