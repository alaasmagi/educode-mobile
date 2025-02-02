import React from 'react';
import NavigationProps from '../../types'
import { Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import NormalButton from '../components/NormalButton'
import SeparatorLine from '../components/SeparatorLine';
import TextBox from '../components/TextBox';



function InitialSelection({ navigation }: NavigationProps) {
    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.view}>
                <Image style={styles.logo} source={require('../assets/logos/main-logo.png')}/>
                <NormalButton text='Log in' onPress={() => navigation.navigate('LoginView')}/>
                <NormalButton text='Register as student' onPress={() => navigation.navigate('CreateAccountView')}/>
                <SeparatorLine text='Or use offline mode only'/>
                <TextBox iconName='person-icon' placeHolder='Student code'/>
                <NormalButton text='Continue' onPress={() => navigation.navigate('LoginView')}/>
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
    }
})

export default InitialSelection;