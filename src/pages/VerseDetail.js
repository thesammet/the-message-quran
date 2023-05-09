import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getLocales } from 'react-native-localize';
import COLORS from '../constants/color';
import TYPOGRAPHY from '../constants/typography';
import CustomHeader from '../components/CustomHeader';
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
import { TextInput } from 'react-native-paper';

const VerseDetail = ({ route }) => {
  const [quranVerses, setQuranVerses] = useState(quranVersesEN);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuranVerses, setFilteredQuranVerses] = useState(quranVerses);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = quranVerses[route.params.chapter].filter((verse) => {
      return verse.text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(formattedQuery);
    });
    setFilteredQuranVerses(filteredData);
    setSearchQuery(text);
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
  }, []);

  const QuranVerseItem = ({ item }) => {
    return useMemo(() => (
      <View style={[
        styles.container
      ]}>
        <View style={styles.leftContainer}>
          <Text style={[styles.subtitle, TYPOGRAPHY.H6Bold]}>{item.verse}.</Text>
          <Text style={[styles.title, TYPOGRAPHY.H5Regular]}>{item.text}</Text>
        </View>
      </View>
    ), [item]);
  };

  return (
    <View style={styles.outerContainer}>
      <TextInput
        placeholder="Search for a verse.."
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
              data={filteredQuranVerses}
              renderItem={({ item }) => <QuranVerseItem item={item} />}
              keyExtractor={(item) => item.verse}
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
  list: {
    backgroundColor: '#fff',
  },
})
export default VerseDetail;