import React from 'react';
import { Image, StyleSheet, View} from 'react-native';
import LanguageSwitch from '../components/LanguageSwitch';
import SettingsButton from '../components/SettingsButton';

function Header({ navigation }: NavigationProps) {
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
        width: 150,
        height: 30,
    },
    structure: {
        flex: 1,
        flexDirection: "row",
        height: 70,
    }
})

export default Header;