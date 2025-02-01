import React from 'react';
import NavigationProps from '../../types'
import { Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

function MainView({ navigation , route}: NavigationProps) {
    const { name } = route.params;
    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.view}>
                <Text style={styles.greeting}>Hello, {name}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 375,
        height: 76,
        marginBottom: 60,
    },
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    greeting: {
        fontWeight: "bold",
        color: "#BCBCBD",
        fontSize: 36,
        marginBottom: 40,
    }
})

export default MainView;