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
import Storage from '../data/LocalDataAccess';
import { GetUserDataByUniId, UserLogin } from '../businesslogic/UserDataOnline';
import ErrorMessage from '../components/ErrorMessage';
import KeyboardVisibilityHandler from '../../hooks/KeyboardVisibilityHandler';

function CreateAccount({ navigation }: NavigationProps) {
  const [uniId, setUniId] = useState<string>('');
  const [studentCode, setStudentCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { t } = useTranslation();
  const isKeyboardVisible = KeyboardVisibilityHandler();
  const [stepNr, setStepNr] = useState(1);

  const handleRegister = async () => {    
    if (await UserLogin(uniId, password)) {
      const userData = await GetUserDataByUniId(uniId);
      if (userData) {
        navigation.navigate('StudentQRScan', { userData });
        Storage.saveData(process.env.EXPO_PUBLIC_LOCAL_DATA, userData);
        console.log("NAME: " + userData.fullName);
        console.log("STDCODE: " + userData.studentCode);
      } else {
      setErrorMessage(t("login-error"));
    
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={globalStyles.anrdoidSafeArea}>
      <View style={styles.headerContainer}>
        <FormHeader />
        <Greeting text={t('welcome')} />
      </View>
      {stepNr === 1 ? (
        <>
        <View style={styles.textBoxContainer}>
        <View style={styles.textBoxes}>
          <TextBox iconName="person-icon" placeHolder={t('first-name')} onChangeText={setUniId} />
          <TextBox iconName="person-icon" placeHolder={t('last-name')} onChangeText={setUniId} />
          <TextBox iconName="person-icon" placeHolder={t('student-code')} onChangeText={setUniId} />
        </View>
        <View style={styles.errorContainer}>
        {errorMessage && (<ErrorMessage text={errorMessage}/>)}
        </View>
        </View>
        <View style={styles.buttonContainer}>
            <NormalButton text={t('continue')} onPress={() => {setStepNr(2)}} />
            <NormalLink text={t('already-registered')} onPress={() => console.log('Link pressed')} />
        </View>
        </>
      ):(
        <>
        <View style={styles.textBoxContainer}>
        <View style={styles.textBoxes}>
          <TextBox iconName="lock-icon" placeHolder={t('password')} isPassword onChangeText={setPassword} />
          <TextBox iconName="lock-icon" placeHolder={t('repeat-password')} isPassword onChangeText={setPassword} />
        </View>
        <View style={styles.errorContainer}>
        {errorMessage && (<ErrorMessage text={errorMessage}/>)}
        </View>
        </View>
        <View style={styles.buttonContainer}>
            <NormalLink text={t('something-wrong-back')} onPress={() => {setStepNr(1)}} />
            <NormalButton text={t('create-account')} onPress={() => {handleRegister(); Keyboard.dismiss()}} />
            <NormalLink text={t('already-registered')} onPress={() => console.log('Link pressed')} />
        </View>
        </>
      )}
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

export default CreateAccount;
