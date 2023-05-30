import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import Settings from '../pages/Settings';
import QuranSources from '../pages/QuranSources';
import { View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../constants/color';
import { ArrowLeft } from '../components/icons';

const Stack = createNativeStackNavigator();

const SettingsStack = ({ navigation }) => {
    const QuranSourcesScreen = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.brown }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: 'white' }}>
                    Quran Sources
                </Text>
                {/* Your content goes here */}
            </View>
        );
    };
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
                            headerTintColor: 'white',
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
