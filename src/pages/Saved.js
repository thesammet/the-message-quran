import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { View, Text } from 'react-native'
import TYPOGRAPHY from '../constants/typography';
import COLORS from '../constants/color';

const Saved = () => {
    const Tab1 = () => <View><Text>Chapters</Text></View>;
    const Tab2 = () => <View><Text>Verses</Text></View>;
    return (
        <ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarBackgroundColor={COLORS.lightBrown}
            tabBarActiveTextColor={COLORS.brown}
            tabBarInactiveTextColor={COLORS.black}
            tabBarTextStyle={{ fontSize: 16 }}

        >
            <Tab1 tabLabel='Chapter' />
            <Tab2 tabLabel='Verse' />
        </ScrollableTabView>
    );
}
export default Saved;