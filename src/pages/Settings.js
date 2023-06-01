import React, { useCallback, useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    Share,
    Linking,
    Platform,
    Alert,
} from 'react-native';
import { ArrowLeft } from '../components/icons';
import FontSelector from '../components/FontSelector';
import TYPOGRAPHY from '../constants/typography';
import { getLocales } from 'react-native-localize';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '../context/Theme';

const sections = (press, navigation) => [
    {
        title: 'Preferences',
        data: [
            { title: 'Dark mode', value: false },
            {
                title: 'Language',
                onPress: () => {
                    press(
                        Platform.OS === 'ios'
                            ? Linking.openURL('App-Prefs:Bluetooth')
                            : Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS')
                    );
                },
                value: 'x',
            },
        ],
    },
    {
        title: 'About',
        data: [
            { title: 'Quran Sources', value: 'x', onPress: () => navigation.navigate('QuranSources') },
            {
                title: 'Rate the App',
                value: 'x',
                onPress: () => {
                    press(
                        Platform.OS === 'ios'
                            ? 'https://apps.apple.com/us/app/ayb%C3%BC-mobil/id1658659307'
                            : 'https://play.google.com/store/apps/details?id=com.scopely.monopolygo&hl=tr&gl=US'
                    );
                },
            },
            { title: 'Share', value: 'x', onPress: () => onShare(shareMessage('tr')) },
            {
                title: 'Requests and complaints',
                value: 'x',
                onPress: () =>
                    handleMailTo('samedakgul99@gmail.com',
                        'The Message Quran App - Requests and Complaints',
                        ''),
            },
        ],
    },
    {
        title: 'Font Selection',
        data: [{ title: '', value: 1 }],
    },
];

const shareMessage = (lang) => {
    const appTitle = "The Message: Quran";
    const iOSLink = "www.google.com";
    const androidLink = "www.google.com";

    const languageTranslations = {
        bn: "Bengali",
        en: "English",
        es: "Spanish",
        fr: "French",
        id: "Indonesian",
        ru: "Russian",
        sv: "Swedish",
        tr: "Turkish",
        ur: "Urdu",
        zh: "Chinese",
    };

    const translatedMessage = {
        bn: `আসসালামু আলাইকুম,

আপনাকে ${appTitle} অ্যাপটি শেয়ার করতে চাই। এই অ্যাপটিতে আপনি কুরআন শরীফকে ${languageTranslations.bn} ভাষায় পড়তে পারবেন, আয়াত এবং সূরা সংরক্ষণ করতে পারবেন।

অ্যাপটি ডাউনলোড করতে নিচের লিংকগুলি ব্যবহার করুন:

iOS: ${iOSLink}
Android: ${androidLink}

আপনার প্রতিক্রিয়া এবং পরামর্শ সর্বদা আপেক্ষিক।

শুভেচ্ছায়.`,

        en: `Hello,

I would like to share ${appTitle} with you. With this app, you can read the Quran in different languages, save verses and chapters.

To download the app, you can use the following links:

iOS: ${iOSLink}
Android: ${androidLink}

Your feedback and suggestions are always welcome.

Regards.`,

        es: `Hola,

Me gustaría compartir ${appTitle} contigo. Con esta aplicación, puedes leer el Corán en diferentes idiomas, guardar versos y capítulos.

Para descargar la aplicación, puedes utilizar los siguientes enlaces:

iOS: ${iOSLink}
Android: ${androidLink}

Tus comentarios y sugerencias son siempre bienvenidos.

Saludos.`,

        fr: `Bonjour,

Je souhaite partager ${appTitle} avec vous. Avec cette application, vous pouvez lire le Coran dans différentes langues, enregistrer des versets et des chapitres.

Pour télécharger l'application, vous pouvez utiliser les liens suivants :

iOS : ${iOSLink}
Android : ${androidLink}

Vos commentaires et suggestions sont toujours les bienvenus.

Cordialement.`,

        id: `Halo,

Saya ingin membagikan ${appTitle} kepada Anda. Dengan aplikasi ini, Anda dapat membaca Al-Quran dalam berbagai bahasa, menyimpan ayat dan surah.

Untuk mengunduh aplikasi, Anda dapat menggunakan tautan berikut:

iOS: ${iOSLink}
Android: ${androidLink}

Masukan dan saran Anda selalu kami nantikan.

Salam.`,

        ru: `Привет,

Я хочу поделиться с вами ${appTitle}. С помощью этого приложения вы можете читать Коран на разных языках, сохранять айаты и суры.

Чтобы скачать приложение, вы можете использовать следующие ссылки:

iOS: ${iOSLink}
Android: ${androidLink}

Ваши отзывы и предложения всегда приветствуются.

С уважением.`,

        sv: `Hej,

Jag vill dela ${appTitle} med dig. Med den här appen kan du läsa Koranen på olika språk, spara verser och kapitel.

För att ladda ner appen kan du använda följande länkar:

iOS: ${iOSLink}
Android: ${androidLink}

Dina åsikter och förslag är alltid välkomna.

Hälsningar.`,

        tr: `Merhaba,

Size ${appTitle}'nı paylaşmak istiyorum. Bu uygulama ile Kuran-ı Kerim'i farklı dillerde okuyabilir, ayet ve sureleri kaydedebilirsiniz.

Uygulamayı indirmek için aşağıdaki linkleri kullanabilirsiniz:

iOS: ${iOSLink}
Android: ${androidLink}

Geri bildirimleriniz ve önerileriniz her zaman bekliyoruz.

Saygılarımızla.`,

        ur: `ہیلو،

میں آپ کے ساتھ ${appTitle} کا تجربہ مشترکہ کرنا چاہتا ہوں۔ اس ایپ کی مدد سے آپ مختلف زبانوں میں قرآن پڑھ سکتے ہیں، آیات اور سوروں کو محفوظ کرسکتے ہیں۔

ایپ ڈاؤن لوڈ کرنے کے لئے ، آپ مندرجہ ذیل لنکوں کا استعمال کرسکتے ہیں:

iOS: ${iOSLink}
Android: ${androidLink}

آپ کے تبصرے اور سفارشات ہمیشہ خوش آمدید ہیں۔

خیر مقدم .`,

        zh: `你好，

我想与您分享${appTitle}。通过这个应用程序，您可以以不同的语言阅读古兰经，保存经文和章节。

要下载该应用程序，您可以使用以下链接：

iOS：${iOSLink}
Android：${androidLink}

我们期待您的反馈和建议。

祝好.`,
    };

    const locales = getLocales();
    const deviceLanguage = locales[0].languageCode;
    const translatedLang = translatedMessage[deviceLanguage] || translatedMessage.en;

    return translatedLang;
};


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

const handleMailTo = async (email, subject, body) => {
    try {
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            throw new Error(`Unable to open URL: ${url}`);
        }
    } catch (error) {
        Alert.alert('Error', error.message);
    }
};

const Settings = ({ navigation }) => {
    const { COLORS } = useTheme();
    const { theme, changeTheme } = useContext(ThemeContext);
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsSwitchEnabled(previousState => !previousState);
        isSwitchEnabled ? changeTheme('light') : changeTheme('dark');
    }

    const handlePress = useCallback(async (url) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    const changeMode = (async (url) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    useEffect(() => {
        console.log(theme)
        setIsSwitchEnabled(theme == 'light' ? false : true)
    }, []);

    const SettingsItem = ({ title, value, onPress }) => (
        onPress ? (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.item, { borderBottomColor: COLORS.settingsItemBorderBottomColor, }]}>
                    <Text style={[TYPOGRAPHY().H4Medium, { color: COLORS.titleColor }]}>{title}</Text>
                    {typeof value === 'boolean' ? (
                        <Switch
                            trackColor={{ false: '#767577', true: COLORS.lightBrown }}
                            thumbColor={isSwitchEnabled ? COLORS.brown : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isSwitchEnabled}
                        />
                    ) : typeof value === 'string' ? (
                        <ArrowLeft width={24} height={24} color={COLORS.brown} opacity={0.8} style={{ transform: [{ rotate: '180deg' }] }} />
                    ) : (
                        <FontSelector />
                    )}
                </View>
            </TouchableOpacity>
        ) : (
            <View style={[styles.item, { borderBottomColor: COLORS.settingsItemBorderBottomColor }]}>
                <Text style={[TYPOGRAPHY().H4Medium, { color: COLORS.titleColor }]}>{title}</Text>
                {typeof value === 'boolean' ? (
                    <Switch
                        trackColor={{ false: '#767577', true: COLORS.lightBrown }}
                        thumbColor={isSwitchEnabled ? COLORS.brown : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isSwitchEnabled}
                    />
                ) : typeof value === 'string' ? (
                    <ArrowLeft width={24} height={24} color={COLORS.brown} opacity={0.8} style={{ transform: [{ rotate: '180deg' }] }} />
                ) : (
                    <FontSelector />
                )}
            </View>
        )
    );

    const SectionHeader = ({ title }) => (
        <View style={[styles.sectionHeader, {
            backgroundColor: COLORS.settingsItemBorderBackgroundColor,
            borderBottomColor: COLORS.settingsItemBorderBottomColor
        }]}>
            <Text style={[styles.sectionTitle, { color: COLORS.settingsItemTextColor }, TYPOGRAPHY().H4Medium]}>{title}</Text>
        </View>
    );

    return (
        <SectionList
            style={{ backgroundColor: COLORS.bgColor }}
            sections={sections(handlePress, navigation)}
            renderItem={({ item }) => <SettingsItem title={item.title} value={item.value} onPress={item.onPress} />}
            renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    sectionHeader: {
        opacity: 0.5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Settings;
