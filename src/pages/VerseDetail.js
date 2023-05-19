import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, } from 'react-native';
import { getLocales } from 'react-native-localize';
import COLORS from '../constants/color';
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
import { ArrowLeft, SaveFillWhite, SaveWhite } from '../components/icons';
import { ChapterSaverContext } from '../context/ChapterSave';
import { VerseSaveContext } from '../context/VerseSave';
import BottomSheet from "react-native-gesture-bottom-sheet";

const VerseDetail = ({ navigation, route }) => {
  const [quranVerses, setQuranVerses] = useState(quranVersesEN);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuranVerses, setFilteredQuranVerses] = useState(quranVerses);
  const [saveStatus, setSaveStatus] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null);
  const { savedChapter, addValueSavedChapter, removeValueSavedChapter } = useContext(ChapterSaverContext);
  const { savedVerses, addSavedVerse, removeSavedVerse } = useContext(VerseSaveContext);
  const bottomSheet = useRef();
  const [saveText, setSaveText] = useState(null)

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = quranVerses[route.params.chapter].filter((verse) => {
      return verse.text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(formattedQuery);
    });
    setFilteredQuranVerses(filteredData);
    setSearchQuery(text);
  };

  const changeSaveStatus = () => {
    const matchedItem = savedVerses.find(
      (item) =>
        item.chapter === selectedItem?.chapter && item.verse === selectedItem?.verse
    );
    if (matchedItem) {
      setSaveText(true);
    } else {
      setSaveText(false);
    }
    console.log(savedVerses);
    console.log(selectedItem);
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

  useEffect(() => {
    const deviceLanguage = getDeviceLanguage();
    handleLangChange(deviceLanguage)
    const isSaved = savedChapter.includes(route.params.chapter.toString())
    setSaveStatus(isSaved)
  }, []);

  const QuranVerseItem = React.memo(({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        setSelectedItem(item);
        bottomSheet.current.show()
        changeSaveStatus()
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

  const BottomSheetItem = (({ title, func }) => {
    return (
      <TouchableOpacity onPress={func}>
        <Text style={[styles.bottomSheetSubTitle, { color: COLORS.brown }, TYPOGRAPHY().H4Medium]}>{title}</Text>
      </TouchableOpacity>
    )
  });

  return (
    <View style={styles.outerContainer}>
      <BottomSheet
        hasDraggableIcon={true}
        ref={bottomSheet}
        height={300}
        radius={24}
        sheetBackgroundColor={COLORS.lightBrown}
        backgroundColor={'transparent'}
        draggable={true} >
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetInnerContent}>
            <Text style={styles.title}>OPTIONS</Text>
            <BottomSheetItem
              title={"Share"}
              func={() => { console.log("a") }}></BottomSheetItem>
            <BottomSheetItem
              title={"Copy"}
              func={() => { console.log("a") }}></BottomSheetItem>
            <BottomSheetItem
              title={!saveText ? "Save" : "Unsave"}
              func={() => {
                !saveText ?
                  addSavedVerse(selectedItem?.verse, selectedItem?.chapter) :
                  removeSavedVerse(selectedItem?.verse, selectedItem?.chapter)
                setSaveText(!saveText)
              }}></BottomSheetItem>
            <BottomSheetItem
              title={"Bookmark"}
              func={() => { console.log("a") }}></BottomSheetItem>
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
            <Text style={[styles.title, { color: COLORS.white }]}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <View
        style={styles.navbackContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>
          <ArrowLeft width={28} height={28} color="white" />
        </TouchableOpacity>
        <Text
          style={[TYPOGRAPHY().H4Regular, { color: COLORS.white }]}>
          {route.params.chapter_name}
        </Text>
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
              <SaveFillWhite width={24} height={24} size={24} />
              : <SaveWhite width={24} height={24} size={24} />}
          </View>
        </TouchableOpacity>
      </View>
      {/*  <TextInput
        placeholder="Search for a verse.."
        onChangeText={handleSearch}
        value={searchQuery}
        backgroundColor={COLORS.lightBrown}
        mode="flat"
        activeUnderlineColor={COLORS.brown}
      /> */}
      <View style={styles.fullFlex}>
        <View
          style={styles.fullFlex}>
          {
            <FlatList
              data={filteredQuranVerses}
              renderItem={({ item }) => <QuranVerseItem item={item} />}
              keyExtractor={(item) => item.verse}
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
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.brown,
  },
  navbackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.brown,
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
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
  }
})
export default VerseDetail;