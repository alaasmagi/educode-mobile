import React, {useState} from 'react';
import NavigationProps from '../../types'
import { Alert,  Image, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { useCameraPermissions } from 'expo-camera';
import TextBox from '../components/TextBox';
import NormalButton from '../components/NormalButton';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../components/LanguageSwitch';
import FormHeader from '../layout/FormHeader';
import Greeting from '../components/Greeting';
import NormalLink from '../components/NormalLink';


function LoginView({ navigation } : NavigationProps) {

    const { t } = useTranslation();
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
            <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                    <FormHeader/>
                    <Greeting text={t("oh-hello-again")}/>
                </View>
                <View style={styles.textBoxContainer}>
                    <View style={styles.textBoxes}>
                        <TextBox iconName='person-icon' placeHolder='Uni-ID'/>
                        <TextBox iconName='lock-icon' placeHolder={t("password")} isPassword={true}/>
                    </View>
                    <View style={styles.forgotPasswordContainer}>
                        <NormalLink text={t("forgot-password")} onPress={() => {console.log("Link pressed")}}/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <NormalButton text={t("log-in")} onPress={handleLogin}/>
                    <NormalLink text={t("register-now")} onPress={() => {console.log("Link pressed")}}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignContent: "center"
    },
    headerContainer:{
        flex: 3,
        justifyContent: "flex-end",
    },
    textBoxContainer: {
        flex: 3,
        justifyContent: "center",
    },
    textBoxes: {
        gap: 25
    },
    forgotPasswordContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "90%",
    },
    buttonContainer:{
        flex: 1.6,
        justifyContent: "center",
        alignItems: "center"
    }

    
})

export default LoginView;





