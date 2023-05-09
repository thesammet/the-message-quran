import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { getLocales } from 'react-native-localize';
import COLORS from '../constants/color';
import TYPOGRAPHY from '../constants/typography';
import CustomHeader from '../components/CustomHeader';
import quranEditionsBN from '../assets/source/editions/bn.json';
import quranEditionsEN from '../assets/source/editions/en.json';
import quranEditionsES from '../assets/source/editions/es.json';
import quranEditionsFR from '../assets/source/editions/fr.json';
import quranEditionsID from '../assets/source/editions/id.json';
import quranEditionsRU from '../assets/source/editions/ru.json';
import quranEditionsSV from '../assets/source/editions/sv.json';
import quranEditionsTR from '../assets/source/editions/tr.json';
import quranEditionsUR from '../assets/source/editions/ur.json';
import quranEditionsZH from '../assets/source/editions/zh.json';

const VerseDetail = ({ route }) => {
  const [quranEditions, setQuranEditions] = useState(quranEditionsEN);

  //SEARCH
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuranEditions, setFilteredQuranEditions] = useState(quranEditions);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = quranEditions.filter((edition) => {
      return edition.text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(formattedQuery);
    });
    setFilteredQuranEditions(filteredData);
    setSearchQuery(text);
  };

  const getDeviceLanguage = () => {
    const locales = getLocales();
    const deviceLanguage = locales[0].languageCode;
    return deviceLanguage;
  };
  const handleLangChange = (lang) => {
    let editions;

    switch (lang) {
      case 'bn':
        editions = quranEditionsBN;
        break;
      case 'en':
        editions = quranEditionsEN;
        break;
      case 'es':
        editions = quranEditionsES;
        break;
      case 'fr':
        editions = quranEditionsFR;
        break;
      case 'id':
        editions = quranEditionsID;
        break;
      case 'ru':
        editions = quranEditionsRU;
        break;
      case 'sv':
        editions = quranEditionsSV;
        break;
      case 'tr':
        editions = quranEditionsTR;
        break;
      case 'ur':
        editions = quranEditionsUR;
        break;
      case 'zh':
        editions = quranEditionsZH;
        break;
      default:
        editions = quranEditionsEN;
    }
    setQuranEditions(editions);
    setFilteredQuranEditions(editions)
  };

  useEffect(() => {
    const deviceLanguage = getDeviceLanguage();
    handleLangChange(deviceLanguage)
  }, []);

  const QuranEditionItem = ({ item }) => {
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
        style={styles.searchBox}
        placeholder="Search for a Quran verse..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.fullFlex}>
        <View
          style={styles.fullFlex}>
          {
            <FlatList
              data={filteredQuranEditions[route.params.chapter]}
              renderItem={({ item }) => <QuranEditionItem item={item} />}
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