import React from 'react';
import NavigationProps from '../../types'
import { Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import globalStyles from '../styles/GlobalStyles';



function InitialSelection({ navigation }: NavigationProps) {
    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.view}>
                <Image style={styles.logo} source={require("../assets/logos/main-logo.png")}/>
                <TouchableOpacity style={globalStyles.normalButton} onPress={() => navigation.navigate('LoginView')}>
                    <Text style={globalStyles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.normalButton}>
                    <Text style={globalStyles.buttonText}>Register as student</Text>
                </TouchableOpacity>
                <View style={globalStyles.lineContainer}>
                    <View style={globalStyles.line} />
                        <Text style={globalStyles.lineText}>Or use offline mode only</Text>
                    <View style={globalStyles.line} />
                </View>
                <View style={globalStyles.inputContainer}>
                    <Image source={require('../assets/icons/person-icon.png')} style={globalStyles.icon} />
                    <TextInput
                    placeholder="Student code"
                    placeholderTextColor="#BCBCBD"
                    style={globalStyles.input}
                    />
                </View>
                <View style={globalStyles.underline} />
                <TouchableOpacity style={globalStyles.normalButton}>
                    <Text style={globalStyles.buttonText}>Continue</Text>
                </TouchableOpacity>
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