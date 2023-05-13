import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home } from './icons';
import COLORS from '../constants/color';

const CustomTabBar = ({ state, descriptors, navigation }) => {
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
                    <View style={{ flex: 1, borderTopWidth: .5, borderTopColor: 'transparent' }} key={index}>
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
                                backgroundColor: COLORS.lightBrown,
                            }}>
                            {isFocused ? (
                                <View>
                                    {label === 'Home' && (
                                        <View style={styles.focusedTab} >
                                            <Home width={24} height={24} color={COLORS.brown} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown }}>Home</Text>
                                        </View>
                                    )}
                                    {label === 'Saved' && (
                                        <View style={styles.focusedTab} >
                                            <Home width={24} height={24} color={COLORS.brown} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown }}>Saved</Text>
                                        </View>
                                    )}
                                    {label === 'Settings' && (
                                        <View style={styles.focusedTab} >
                                            <Home width={24} height={24} color={COLORS.brown} />
                                            <Text style={{ marginTop: 4, color: COLORS.brown }}>Settings</Text>
                                        </View>
                                    )}

                                </View>
                            ) : (
                                <View>
                                    {label === 'Home' && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Home width={24} height={24} color={COLORS.brown} opacity={.5} />
                                            </View>
                                            <Text style={{ marginTop: 4, color: COLORS.brown, opacity: .5 }}>Home</Text>
                                        </View>
                                    )}
                                    {label === 'Saved' && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Home width={24} height={24} color={COLORS.brown} opacity={.5} />
                                            </View>
                                            <Text style={{ marginTop: 4, color: COLORS.brown, opacity: .5 }}>Saved</Text>
                                        </View>
                                    )}
                                    {label === 'Settings' && (
                                        <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.containerUnfocus}>
                                                <Home width={24} height={24} color={COLORS.brown} opacity={.5} />
                                            </View>
                                            <Text style={{ marginTop: 4, color: COLORS.brown, opacity: .5 }}>Settings</Text>
                                        </View>
                                    )}

                                </View>
                            )
                            }
                        </TouchableOpacity>
                    </View>
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
