import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import { Home, ArrowLeft } from '../components/icons';
import COLORS from '../constants/color';
import TYPOGRAPHY from '../constants/typography';

const CustomHeader = ({
    navigation,
    title = '',
    isNavBack = false,
    type = '',
    ...props
}) => {

    const forwardBack = () => {
        navigation.goBack();
    };

    return (
        <>
            {
                title == 'Ana Sayfa' ?
                    <View style={styles.container}>
                        <Text>Chapters</Text>
                    </View>
                    :
                    title == 'Cüzdanım' ?
                        <View>
                            <View style={styles.walletContainer}>
                                <View style={styles.backgroundImage} {...props}>
                                    <Text
                                        style={styles.textNavTrue}>
                                        {title}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('NotificationStack')}
                                            activeOpacity={0.8}>
                                            <View style={styles.iconView}>
                                                <Home height={28} width={28}></Home>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('ProfileStack')}
                                            activeOpacity={0.8}>
                                            <View style={styles.iconView}>
                                                <Home height={28} width={28}></Home>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        isNavBack ? (
                            <View
                                style={styles.navbackContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => type == 'game' ? navigation.navigate("QrScreen") : forwardBack()} activeOpacity={0.8}>
                                        <ArrowLeft width={28} height={28} color="#101010" />
                                    </TouchableOpacity>
                                    <Text
                                        style={[styles.textNavTrue, type == 'game' && styles.textGame, { marginLeft: 4 }]}>
                                        {title}
                                    </Text>
                                </View>
                                {title == "Haber Detayı" ? <Home width="28" height="28" color={'white'} />
                                    :
                                    title == "Kampanya Detayı" ? <Home width="28" height="28" color={'white'} /> :
                                        title == "QR ile Yükle" ? <Home width="28" height="28" color={'white'} /> :
                                            <View />}
                            </View>
                        ) : (
                            <View
                                style={styles.container}>
                                <View style={styles.backgroundImage} {...props}>
                                    <Text style={styles.textNavFalse}>{title}</Text>
                                </View>
                            </View>
                        )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.brown,
        paddingTop: 10,
        paddingBottom: 12,
        paddingHorizontal: 32,
        //borderBottomWidth: 1,
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
    walletContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.brown,
        paddingTop: 10,
        paddingBottom: 12,
        paddingHorizontal: 32,
    },
    navbackContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.brown,
        paddingTop: 10,
        paddingBottom: 12,
        paddingHorizontal: 24,
        //borderBottomWidth: 1,
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
    textNavFalse: {
        fontSize: 27,
        color: 'white',
        fontWeight: '500',
    },
    textNavTrue: {
        fontSize: 24,
        color: 'white',
        fontWeight: '600',
    },
    textGame: {
        fontSize: 15,
        flexWrap: 'wrap',
        flex: 1,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    dividerSub: {
        borderBottomWidth: 1,
        borderRadius: 4,
        width: '100%',
    },
    dropShadow: {
        shadowColor: '#F20000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    arrowLeftContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 8,
    },
    backgroundImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    backgroundImageHome: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    iconView: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#1FB4FF',
        padding: 6,
        marginLeft: 4
    },
});

export default CustomHeader;
