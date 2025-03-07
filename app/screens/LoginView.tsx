import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useCameraPermissions } from 'expo-camera';
import NavigationProps from '../../types';
import globalStyles from '../styles/GlobalStyles';
import TextBox from '../components/TextBox';
import NormalButton from '../components/NormalButton';
import FormHeader from '../layout/FormHeader';
import Greeting from '../components/Greeting';
import NormalLink from '../components/NormalLink';
import { FetchAndSaveUserDataByUniId, UserLogin } from '../businesslogic/UserDataOnline';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage'
import KeyboardVisibilityHandler from '../../hooks/KeyboardVisibilityHandler';
import LocalUserData from '../models/LocalUserDataModel';
import { GetOfflineUserData, SaveOfflineUserData } from '../businesslogic/UserDataOffline';

function LoginView({ navigation, route }: NavigationProps) {
  const { t } = useTranslation();
  const successMessage = route?.params?.successMessage || null;
  const [permission, requestPermission] = useCameraPermissions();
  const [uniId, setUniId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isKeyboardVisible = KeyboardVisibilityHandler();

  const isFormValid = () => uniId !== '' && password !== '';

  const handleLogin = async () => {
    const response = await requestPermission();
    if (!response.granted) {
      Alert.alert('Permission Denied', 'You need to allow camera access to continue.');
      return;
    };
    
    if (await UserLogin(uniId, password)) {
      const loginStatus = await FetchAndSaveUserDataByUniId(uniId);
      if (loginStatus) {
        const localData = await GetOfflineUserData();
        if (localData) {
          localData.userType === "Teacher" ? 
          navigation.navigate('TeacherMainView', { localData }) :
          navigation.navigate('StudentMainView', { localData });
        }
      } else {
      setErrorMessage(t("login-error"));
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    };
  };
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={globalStyles.anrdoidSafeArea}>
      <View style={styles.headerContainer}>
        <FormHeader />
        {!isKeyboardVisible && <Greeting text={t('oh-hello-again')} />}
      </View>
      <View style={styles.textBoxContainer}>
        <View style={styles.textBoxes}>
          <TextBox 
            iconName="person-icon" 
            placeHolder="Uni-ID" 
            onChangeText={setUniId} 
            value={uniId} 
            autoCapitalize='none'/>
          <TextBox 
            iconName="lock-icon" 
            placeHolder={t('password')} 
            isPassword 
            onChangeText={setPassword} 
            value={password}/>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <NormalLink 
            text={t('forgot-password')} 
            onPress={() => navigation.navigate("ForgotPasswordView")} />
        </View>
        <View style={styles.errorContainer}>
        {!isKeyboardVisible && errorMessage && (<ErrorMessage text={errorMessage}/>)}
        {!isKeyboardVisible && successMessage && (<SuccessMessage text={successMessage}/>)}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <NormalButton 
          text={t('log-in')} 
          onPress={() => {handleLogin(); Keyboard.dismiss()}} 
          disabled={!isFormValid()}/>
        <NormalLink 
          text={t('register-now')} 
          onPress={() => navigation.navigate("CreateAccountView")} />
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2.2,
    gap: 70,
    justifyContent: 'flex-end',
  },
  textBoxContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  textBoxes: {
    gap: 25,
    alignItems:"center"
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
  },
  errorContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginView;
