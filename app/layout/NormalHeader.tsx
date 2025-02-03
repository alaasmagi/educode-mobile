import React from 'react';
import { Image, StyleSheet, View} from 'react-native';
import LanguageSwitch from '../components/LanguageSwitch';
import SettingsButton from '../components/SettingsButton';

function NormalHeader({ navigation }: NavigationProps) {
    return (
        <View style={styles.structure}>
            <Image style={styles.logo} resizeMode='contain' source={require('../assets/logos/main-logo.png')}/>
            <LanguageSwitch/>
            <SettingsButton onPress={() => navigation.navigate('SettingsView')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 225,
        height: 45,
        alignSelf: "center"
    },
    structure: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default NormalHeader;