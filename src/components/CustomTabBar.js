import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Quran, Bookmark, Setting } from './icons';
import { useTheme } from '@react-navigation/native';
import { strings } from '../utils/localization';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const { COLORS } = useTheme();

    return (
        <View style={{ flexDirection: 'row', }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View style={{ flex: 1, borderTopWidth: .5, borderTopColor: COLORS.tabbarBorderTop }} key={index}>
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            activeOpacity={1}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 60,
                                backgroundColor: COLORS.tabbarBackgroundColor
                            }}>
                            {isFocused ? (
                                <View>
                                    {label === strings.home && (
                                        <View style={styles.focusedTab} >
                                            <Quran width={24} height={24} fill={COLORS.tabbarIconColor} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown, color: COLORS.tabbarTitleColor }}>{strings.home}</Text>
                                        </View>
                                    )}
                                    {label === strings.saved && (
                                        <View style={styles.focusedTab} >
                                            <Bookmark width={24} height={24} fill={COLORS.tabbarIconColor} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown, color: COLORS.tabbarTitleColor }}>{strings.saved}</Text>
                                        </View>
                                    )}
                                    {label === strings.settings && (
                                        <View style={styles.focusedTab} >
                                            <Setting width={24} height={24} fill={COLORS.tabbarIconColor} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown, color: COLORS.tabbarTitleColor }}>{strings.settings}</Text>
                                        </View>
                                    )}

                                </View>
                            ) : (
                                <View>
                                    {label === strings.home && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Quran width={24} height={24} fill={COLORS.tabbarPaleIconColor} />
                                            </View>
                                            <Text style={{ marginTop: 4, color: COLORS.tabbarPaleTitleColor }}>{strings.home}</Text>
                                        </View>
                                    )}
                                    {label === strings.saved && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Bookmark width={24} height={24} fill={COLORS.tabbarPaleIconColor} />
                                            </View>
                                            <Text style={{ marginTop: 4, color: COLORS.tabbarPaleTitleColor }}>{strings.saved}</Text>
                                        </View>
                                    )}
                                    {label === strings.settings && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Setting width={24} height={24} fill={COLORS.tabbarPaleIconColor} />
                                            </View>
                                            <Text style={{ marginTop: 4, color: COLORS.tabbarPaleTitleColor }}>{strings.settings}</Text>
                                        </View>
                                    )}

                                </View>
                            )
                            }
                        </TouchableOpacity>
                    </View >
                );
            })}
        </View >
    );
};

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowRadius: 7.95,
        zIndex: 10,
    },
    containerUnfocus: {
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
    },
    focusedTab: {
        alignContent: 'center',
        alignItems: 'center',
    },
});

export default CustomTabBar;
