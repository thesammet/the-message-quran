import React from 'react';
import { View } from 'react-native';
import HomeStack from '../stacks/Home';
import Settings from '../pages/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Time } from '../components/icons';
import FlashMessage from 'react-native-flash-message';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <>
            <FlashMessage position="bottom" floating={true} />
            <Tab.Navigator
                tabBar={props => <CustomTabBar {...props} />}
            >
                <Tab.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        title: 'Home',
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        title: 'Settings',
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default Tabs;