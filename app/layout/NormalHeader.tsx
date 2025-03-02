import React from 'react';
import { Image, StyleSheet, View} from 'react-native';
import LanguageSwitch from '../components/LanguageSwitch';
import Storage from '../data/LocalDataAccess';
import SettingsButton from '../components/SettingsButton';
import User from '../models/UserData';

function NormalHeader({ navigation, route }: NavigationProps) {
    const {userData} = route.params
    return (
        <View style={styles.structure}>
            <Image style={styles.logo} resizeMode='contain' source={require('../assets/logos/splash-logo.png')}/>
            <View style={styles.buttonContainer}>
                <LanguageSwitch/>
                <SettingsButton onPress={() => navigation.navigate('SettingsView', {userData})}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 239,
        height: 48,
        alignSelf: "center"
    },
    structure: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 5
    }
})

export default NormalHeader;