import React from 'react';
import { Image, StyleSheet, View} from 'react-native';
import LanguageSwitch from '../components/LanguageSwitch';


const FormHeader = () => {
    return (
        <View style={styles.structure}>
            <Image style={styles.logo} resizeMode='contain' source={require('../assets/logos/main-logo.png')}/>
            <LanguageSwitch/>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 298,
        height: 60,
        alignSelf: "center"
    },
    structure: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})

export default FormHeader;