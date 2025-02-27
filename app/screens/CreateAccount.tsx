import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
import NormalMessage from '../components/NormalMessage';
import DataText from '../components/DataText';
import UnderlineText from '../components/UnderlineText';

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
        {!isKeyboardVisible && (
          <Greeting text={t('welcome')} />
        )}
      </View>
      {stepNr === 1 && (
        <>
        <View style={styles.textBoxContainer}>
        <View style={styles.textBoxes}>
          <TextBox iconName="person-icon" 
            placeHolder={t('first-name') + ' *'} 
            onChangeText={setFirstName} 
            value = {firstName}/>
          <TextBox iconName="person-icon" 
            placeHolder={t('last-name') + ' *'} 
            onChangeText={setLastName}
            value={lastName}/>
        </View>
        {(firstName == '' || lastName == '') && !isKeyboardVisible && (
          <View style={styles.errorContainer}>
            <NormalMessage text={t('all-fields-required-error')}/>
          </View>
        )}
        </View>
        <View style={styles.buttonContainer}>
            <NormalButton text={t('continue')} 
              onPress={() => {setStepNr(2)}} 
              disabled={firstName == '' || lastName == ''} />
            <NormalLink text={t('already-registered')} onPress={() => navigation.navigate("LoginView")} />
        </View>
        </>
      )}
      {stepNr === 2 && (
        <>
        <View style={styles.textBoxContainer}>
        <View style={styles.textBoxes}>
          <TextBox iconName="person-icon" 
            placeHolder="Uni-ID *" 
            onChangeText={setUniId}
            value={uniId}/>
          <TextBox iconName="person-icon" 
            placeHolder={t('student-code') + ' *'} 
            onChangeText={setStudentCode}
            value={studentCode}/>
        </View>
        {(uniId == '' || studentCode == '') && !isKeyboardVisible && (
          <View style={styles.errorContainer}>
          <NormalMessage text={t('all-fields-required-error')}/>
          </View>
        )}
        </View>
        <View style={styles.buttonContainer}>
            <NormalLink text={t('something-wrong-back')} onPress={() => {setStepNr(1)}} />
            <NormalButton 
              text={t('continue')} 
              onPress={() => {setStepNr(3)}}
              disabled={uniId == '' || studentCode == '' }/>
            <NormalLink text={t('already-registered')} onPress={() => navigation.navigate("LoginView")} />
        </View>
        </>
      )}
      {stepNr === 3 && (
        <>
        <View style={styles.textBoxContainer}>
        <View style={styles.textBoxes}>
        {password !== '' && !isKeyboardVisible && (
          (password.length < 8 || password !== passwordAgain) && (
          <ErrorMessage 
            text={t(password.length < 8 ? 'password-length-error' : 'password-match-error')}/>
          )
        )}
          <TextBox iconName="lock-icon" 
            placeHolder={t('password')} 
            isPassword 
            onChangeText={setPassword}
            value={password}/>
          <TextBox iconName="lock-icon" 
            placeHolder={t('repeat-password')} 
            isPassword 
            onChangeText={setPasswordAgain}
            value={passwordAgain}/>
        </View>
        <View style={styles.errorContainer}>
        {errorMessage && (<ErrorMessage text={errorMessage}/>)}
        </View>
        </View>
        <View style={styles.buttonContainer}>
            <NormalLink text={t('something-wrong-back')} onPress={() => {setStepNr(2)}} />
            <NormalButton 
              text={t('continue')} 
              onPress={() => {setStepNr(4)}}
              disabled={password.length < 8 || password !== passwordAgain}/>
            <NormalLink text={t('already-registered')} onPress={() => navigation.navigate("LoginView")} />
        </View>
        </>
      )}
      {stepNr === 4 && (
        <>
        <View style={styles.textBoxContainer}>
        <UnderlineText text="Verify your details:"/>
        <View style={styles.data}>
          <DataText iconName='person-icon' text={firstName + ' ' + lastName}/>
          <DataText iconName="person-icon" text={uniId} />
          <DataText iconName='person-icon' text={studentCode}/>
        </View>
        <View style={styles.errorContainer}>
        {errorMessage && (<ErrorMessage text={errorMessage}/>)}
        </View>
        </View>
        <View style={styles.buttonContainer}>
            <NormalLink text={t('something-wrong-back')} onPress={() => {setStepNr(2)}} />
            <NormalButton 
              text={t('create-account')}
              onPress={() => {handleRegister(); Keyboard.dismiss()}} />
            <NormalLink text={t('already-registered')} onPress={() => navigation.navigate("LoginView")} />
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
  data: {
    alignSelf: "center",
    width: "80%",
    borderWidth: 2,
    borderColor: "#BCBCBD",
    borderRadius: 20,
    gap: 25,
    padding: 10
  },
  textBoxes: {
    gap: 25,
    alignItems:"center",
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
