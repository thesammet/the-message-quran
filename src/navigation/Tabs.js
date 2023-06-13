import React from 'react';
import { View } from 'react-native';
import HomeStack from '../stacks/Home';
import Settings from '../pages/Settings';
import Saved from '../pages/Saved';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Time } from '../components/icons';
import FlashMessage from 'react-native-flash-message';
import CustomTabBar from '../components/CustomTabBar';
import SettingsStack from '../stacks/Settings';
import { strings } from '../utils/localization';

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
                        title: `${strings.home}`,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Saved"
                    component={Saved}
                    options={{
                        title: `${strings.saved}`,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="SettingsStack"
                    component={SettingsStack}
                    options={{
                        title: `${strings.settings}`,
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default Tabs;
