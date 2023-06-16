import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import Settings from '../pages/Settings';
import QuranSources from '../pages/QuranSources';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from '../components/icons';
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const SettingsStack = ({ navigation }) => {
    const { COLORS } = useTheme();
    return (
        <>
            <FlashMessage position="bottom" floating={true} />
            {
                <Stack.Navigator>
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="QuranSources"
                        component={QuranSources}
                        options={{
                            headerTitle: null,
                            headerStyle: { backgroundColor: COLORS.brown },
                            headerTintColor: COLORS.white,
                            headerTitleAlign: "center",
                            headerLeft: () =>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Settings')
                                    }}>
                                    <ArrowLeft
                                        width={24}
                                        height={24}
                                        color={COLORS.white}
                                        opacity={0.8}
                                    />
                                </TouchableOpacity>
                        }}
                    />
                </Stack.Navigator>
            }
        </>
    );
};
export default SettingsStack;
