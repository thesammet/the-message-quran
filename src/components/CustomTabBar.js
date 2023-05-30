import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Quran, Bookmark, Setting } from './icons';
import { useTheme } from '@react-navigation/native';

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
                                    {label === 'Home' && (
                                        <View style={styles.focusedTab} >
                                            <Quran width={24} height={24} fill={COLORS.brown} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown }}>Home</Text>
                                        </View>
                                    )}
                                    {label === 'Saved' && (
                                        <View style={styles.focusedTab} >
                                            <Bookmark width={24} height={24} fill={COLORS.brown} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown }}>Saved</Text>
                                        </View>
                                    )}
                                    {label === 'Settings' && (
                                        <View style={styles.focusedTab} >
                                            <Setting width={24} height={24} fill={COLORS.brown} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown }}>Settings</Text>
                                        </View>
                                    )}

                                </View>
                            ) : (
                                <View>
                                    {label === 'Home' && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Quran width={24} height={24} opacity={.7} />
                                            </View>
                                            <Text style={{ marginTop: 4, opacity: .7 }}>Home</Text>
                                        </View>
                                    )}
                                    {label === 'Saved' && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Bookmark width={24} height={24} opacity={.7} />
                                            </View>
                                            <Text style={{ marginTop: 4, opacity: .7 }}>Saved</Text>
                                        </View>
                                    )}
                                    {label === 'Settings' && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Setting width={24} height={24} opacity={.7} />
                                            </View>
                                            <Text style={{ marginTop: 4, opacity: .7 }}>Settings</Text>
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
