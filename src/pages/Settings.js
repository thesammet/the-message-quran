import React from 'react';
import { View, Text, Switch, StyleSheet, SectionList } from 'react-native';
import { Home } from '../components/icons';

const sections = [
    {
        title: 'Account',
        data: [
            { title: 'Notifications', value: true },
            { title: 'Emails', value: true },
        ],
    },
    {
        title: 'Settings',
        data: [
            { title: 'Dark mode', value: false },
            { title: 'Language', value: 'English' },
        ],
    },
];

const SettingsItem = ({ title, value }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        {typeof value === 'boolean' ? (
            <Switch value={value} />
        ) : (
            <Text style={styles.value}>{value}</Text>
        )}
    </View>
);

const SectionHeader = ({ title, icon }) => (
    <View style={styles.sectionHeader}>
        {icon}
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

const Settings = () => (
    <SectionList
        sections={sections}
        renderItem={({ item }) => (
            <SettingsItem title={item.title} value={item.value} />
        )}
        renderSectionHeader={({ section: { title } }) => (
            <SectionHeader title={title} icon={<Home name="ios-arrow-forward" width={24} height={24} color="black" />} />
        )}
    />
);

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#888',
    },
    sectionHeader: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Settings;