import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Share,
  Image
} from 'react-native';
import { getLocales } from 'react-native-localize';
import TYPOGRAPHY from '../constants/typography';
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
import {
  ArrowLeft,
  SaveFillWhite,
  SaveWhite,
  Search,
  Cross
} from '../components/icons';
import { ChapterSaverContext } from '../context/ChapterSave';
import { VerseSaveContext } from '../context/VerseSave';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { BookmarkContext } from '../context/Bookmark';
import { TextInput } from 'react-native-paper';
import { Quran } from '../image/index';
import { strings } from '../utils/localization';

const VerseDetail = ({ navigation, route }) => {
  const [quranVerses, setQuranVerses] = useState(quranVersesEN);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuranVerses, setFilteredQuranVerses] = useState(quranVerses);
  const [saveStatus, setSaveStatus] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { savedChapter, addValueSavedChapter, removeValueSavedChapter } = useContext(ChapterSaverContext);
  const { savedVerses, addSavedVerse, removeSavedVerse } = useContext(VerseSaveContext);
  const bottomSheet = useRef();
  const [saveText, setSaveText] = useState(null);
  const { COLORS } = useTheme();
  const [isSearch, setSearch] = useState(false)

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = quranVerses[route.params.chapter].filter((verse) => {
      return verse.text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(formattedQuery);
    });
    setFilteredQuranVerses(filteredData);
    setSearchQuery(text);
  };

  const changeSaveStatus = (itemSelected) => {
    const matchedItem = savedVerses.find(
      (item) =>
        item.chapter === itemSelected?.chapter && item.verse === itemSelected?.verse
    );
    if (matchedItem) {
      setSaveText(true);
    } else {
      setSaveText(false);
    }
  };

  const getDeviceLanguage = () => {
    const locales = getLocales();
    const deviceLanguage = locales[0].languageCode;
    return deviceLanguage;
  };
  const handleLangChange = (lang) => {
    let verses;

    switch (lang) {
      case 'bn':
        verses = quranVersesBN;
        break;
      case 'en':
        verses = quranVersesEN;
        break;
      case 'es':
        verses = quranVersesES;
        break;
      case 'fr':
        verses = quranVersesFR;
        break;
      case 'id':
        verses = quranVersesID;
        break;
      case 'ru':
        verses = quranVersesRU;
        break;
      case 'sv':
        verses = quranVersesSV;
        break;
      case 'tr':
        verses = quranVersesTR;
        break;
      case 'ur':
        verses = quranVersesUR;
        break;
      case 'zh':
        verses = quranVersesZH;
        break;
      default:
        verses = quranVersesEN;
    }
    setQuranVerses(verses);
    setFilteredQuranVerses(verses[route.params.chapter])
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const flatListRef = useRef(null);

  useEffect(() => {
    const deviceLanguage = getDeviceLanguage();
    handleLangChange(deviceLanguage)
    const isSaved = savedChapter.includes(route.params.chapter.toString())
    setSaveStatus(isSaved)
  }, []);

  useEffect(() => {
    const initialIndex = route.params.moved_item - 1
    if (flatListRef?.current) {
      flatListRef?.current.scrollToIndex({
        index: initialIndex,
        animated: true
      })
    }
  }, [filteredQuranVerses, route.params.moved_item])

  const QuranVerseItem = React.memo(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(item);
          bottomSheet.current.show()
          changeSaveStatus(item)
        }}
        activeOpacity={.6}>
        <View style={[
          styles.container,
          { borderColor: COLORS.borderColor, },
          { backgroundColor: COLORS.itemBg },
        ]}>
          <View style={styles.leftContainer}>
            <Text style={[styles.subtitle, { color: COLORS.brown, }, TYPOGRAPHY().H6Bold]}>{item.verse}.</Text>
            <Text style={[styles.title, { color: COLORS.titleColor }, TYPOGRAPHY().H5Regular]}>{item.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  });

  const BottomSheetItem = (({ title, func }) => {
    return (
      <TouchableOpacity onPress={func}>
        <Text style={[styles.bottomSheetSubTitle, { color: COLORS.brown }, TYPOGRAPHY().H4Medium]}>{title}</Text>
      </TouchableOpacity>
    )
  });

  const onShare = async (content) => {
    try {
      const result = await Share.share({
        message: content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const { saveBookmark } = useContext(BookmarkContext);

  return (
    <View style={[styles.outerContainer, { backgroundColor: COLORS.bgColor }]}>
      <BottomSheet
        hasDraggableIcon={true}
        ref={bottomSheet}
        height={300}
        radius={24}
        sheetBackgroundColor={COLORS.lightBrown}
        backgroundColor={COLORS.bottomSheetBackgroundColor}
        draggable={true} >
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetInnerContent}>
            <Text style={styles.title}>{strings.options}</Text>
            <BottomSheetItem
              title={strings.share}
              func={() => {
                const appName = "The Message - Quran";
                const chapter = route.params.chapter_name;
                const verse = selectedItem?.text
                const chapterVerseCount = selectedItem?.chapter;
                const verseCount = selectedItem?.verse;
                const textToShare = `${strings.sharedWith}: ${appName}\n\n${strings.chapter}: ${chapter} (${chapterVerseCount}. ${strings.verse})\n${strings.quranVerse}: ${verse} (${verseCount}. ${strings.verse})`;
                onShare(textToShare)
              }}></BottomSheetItem>
            <BottomSheetItem
              title={"Copy"}
              func={() => {
                const chapter = route.params.chapter_name;
                const verse = selectedItem?.text
                const chapterVerseCount = selectedItem?.chapter;
                const verseCount = selectedItem?.verse;
                const textToShare = `${strings.chapter}: ${chapter} (${chapterVerseCount}. ${strings.verse})\n${strings.quranVerse}: ${verse} (${verseCount}. ${strings.verse})`;
                copyToClipboard(textToShare)
                bottomSheet.current.close()
              }}></BottomSheetItem>
            <BottomSheetItem
              title={!saveText ? strings.save : strings.unSave}
              func={() => {
                !saveText ?
                  addSavedVerse(selectedItem?.verse, selectedItem?.chapter) :
                  removeSavedVerse(selectedItem?.verse, selectedItem?.chapter)
                setSaveText(!saveText)
                bottomSheet.current.close()
              }}></BottomSheetItem>
            <BottomSheetItem
              title={strings.bookmark}
              func={() => {
                saveBookmark({
                  chapter: selectedItem?.chapter,
                  chapter_name: route.params.chapter_name,
                  chapter_total_verses: route.params.chapter_total_verses,
                  moved_item: selectedItem?.verse
                })
                bottomSheet.current.close()
              }}></BottomSheetItem>
          </View>
          <TouchableOpacity
            onPress={() => {
              bottomSheet.current.close()
            }}
            style={{
              backgroundColor: COLORS.brown,
              width: '100%',
              alignItems: 'center',
              borderRadius: 16,
              paddingVertical: 8
            }}>
            <Text style={[styles.title, { color: COLORS.titleColor }]}>{strings.close}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <View
        style={[styles.navbackContainer, { backgroundColor: COLORS.brown, shadowColor: COLORS.shadowColor }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}>
            <ArrowLeft width={28} height={28} color={COLORS.white} />
          </TouchableOpacity>
          <View style={{ width: 28 }} />
        </View>
        {
          isSearch ?
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <TextInput
                placeholder={strings.searchVerseHint}
                onChangeText={handleSearch}
                value={searchQuery}
                mode="outlined"
                style={{ flex: 1 }}
                activeUnderlineColor={'red'}
                activeOutlineColor={COLORS.brown}
                theme={{
                  colors: {
                    placeholder: COLORS.brown,
                    background: COLORS.lightBrown
                  },
                  roundness: 24
                }}
              />
              <TouchableOpacity onPress={() => {
                setSearch(false)
                handleSearch("")
              }}>
                <View>
                  <Cross width={32} height={32} fill={'white'} />
                </View>
              </TouchableOpacity>
            </View>
            :
            <>
              <View style={styles.headerCenter}>
                <Text
                  style={[TYPOGRAPHY().H4Regular, { color: COLORS.white }]}>
                  {route.params.chapter_name}
                </Text>
                <Text
                  style={[TYPOGRAPHY().H6Medium, { color: COLORS.verseAmountText }]}>
                  {route.params.chapter_total_verses} {strings.verses}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                  if (!saveStatus) {
                    addValueSavedChapter(route.params.chapter.toString())
                    setSaveStatus(true)
                  } else {
                    removeValueSavedChapter(route.params.chapter.toString())
                    setSaveStatus(false)
                  }
                }}>
                  <View>
                    {saveStatus ?
                      <SaveFillWhite width={32} height={32} />
                      : <SaveWhite width={32} height={32} />}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setSearch(true)
                }}>
                  <View>
                    <Search width={32} height={32} />
                  </View>
                </TouchableOpacity>
              </View>
            </>}
      </View>
      {
        filteredQuranVerses && filteredQuranVerses.length > 0 ?
          <FlatList
            ref={flatListRef}
            data={filteredQuranVerses}
            renderItem={({ item }) => <QuranVerseItem item={item} />}
            keyExtractor={(item) => item.verse}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
              });
            }}
          />
          : <View>
            <Text style={[styles.noText, { color: COLORS.brown }, TYPOGRAPHY.apply().H4Bold]}>{strings.verseCouldntFind}</Text>
            <Image source={Quran}
              style={{
                height: 145,
                width: 225,
                alignSelf: 'center',
                marginTop: 8
              }} />
          </View>}
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
    padding: 16,
    paddingLeft: 8
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  navbackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 13,
    zIndex: 13,
  },
  bottomSheetContent: {
    alignItems: 'center',
    flex: 1,
    margin: 16,
    justifyContent: 'space-between'
  },
  bottomSheetInnerContent: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetSubTitle: {
    marginVertical: 8
  },
  headerCenter: {
    alignItems: 'center',
  },
  bottomSheetInnerContent: {
    flex: 1,
    alignItems: 'center',
  },
  noText: {
    textAlign: 'center',
    marginTop: 64
  },
})
export default VerseDetail;