import React, {useState} from 'react';
import NavigationProps from '../../types'
import { Alert,  Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { useCameraPermissions } from 'expo-camera';


function LoginView({ navigation } : NavigationProps) {

    const [name, setName] = useState('');
    const [permission, requestPermission] = useCameraPermissions();

    const handleLogin = async () => {
        const response = await requestPermission();
        if (response.granted) {
            navigation.navigate('MainView', { name });
        } else {
            Alert.alert("Permission Denied", "You need to allow camera access to continue.");
        }
    };

    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.view}>
                <Image style={styles.logo} source={require("../assets/logos/main-logo.png")}/>
                <Text style={styles.greeting}>Oh, hello again!</Text>
                <View style={globalStyles.inputContainer}>
                    <Image source={require('../assets/icons/person-icon.png')} style={globalStyles.icon} />
                    <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Uni-ID"
                    placeholderTextColor="#BCBCBD"
                    style={globalStyles.input}
                    />
                </View>
                <View style={globalStyles.underline} />
                <View style={globalStyles.inputContainer}>
                    <Image source={require('../assets/icons/lock-icon.png')} style={globalStyles.icon} />
                    <TextInput
                    placeholder="Password"
                    placeholderTextColor="#BCBCBD"
                    style={globalStyles.input}
                    secureTextEntry={true}
                    />
                </View>
                <View style={globalStyles.underline} />
                <TouchableOpacity style={globalStyles.normalButton} onPress={handleLogin}>
                    <Text style={globalStyles.buttonText}>Log in</Text>
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
    },
    greeting: {
        fontWeight: "bold",
        color: "#BCBCBD",
        fontSize: 36,
        marginBottom: 40,
    }
})

export default LoginView;