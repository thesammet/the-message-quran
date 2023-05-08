import React from 'react';
import HomeScreen from '../pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <>
            <FlashMessage position="bottom" floating={true} />
            {
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            }
        </>
    );
};
export default HomeStack;
