import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import NavigationProps from '../../types';
import globalStyles from '../styles/GlobalStyles';
import TextBox from '../components/TextBox';
import NormalButton from '../components/NormalButton';
import FormHeader from '../layout/FormHeader';
import Greeting from '../components/Greeting';
import NormalLink from '../components/NormalLink';
import { RequestPasswordResetCode} from '../businesslogic/UserDataOnline';
import ErrorMessage from '../components/ErrorMessage';
import KeyboardVisibilityHandler from '../../hooks/KeyboardVisibilityHandler';
import NormalMessage from '../components/NormalMessage';
import DataText from '../components/DataText';
import UnderlineText from '../components/UnderlineText';
import ForgotPasswordModel from '../models/ForgotPasswordModel';

function ForgotPasswordView({ navigation }: NavigationProps) {
  const [uniId, setUniId] = useState<string>('');
  const [studentCode, setStudentCode] = useState<string>('');
  const [emailCode, setEmailCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [normalMessage, setNormalMessage] = useState<string | null>(null);

  const { t } = useTranslation();
  const isKeyboardVisible = KeyboardVisibilityHandler();
  const [stepNr, setStepNr] = useState(1);

  const isStudentIDFormValid = () => uniId !== '' && studentCode !== '';
  useEffect(() => {
    if (!isStudentIDFormValid()) {
      setNormalMessage(t('all-fields-required-message'));
    } else {
      setNormalMessage('');
    }
  }, [uniId, studentCode]);

  const isPasswordFormValid = () => password.length >= 8 && password === passwordAgain;
  useEffect(() => {
    if (password.length < 8 && password !== '') {
      setNormalMessage(t('password-length-message'));
    } else if (!isPasswordFormValid() && password !== '' && passwordAgain !== '') {
      setNormalMessage(t('password-match-message'));
    } else {
      setNormalMessage('');
    }
  }, [password, passwordAgain]);

  const handleEmailRequest = async () => {
    const userData:ForgotPasswordModel = {
        uniId: uniId,
        studentCode: studentCode
    }

    if(await RequestPasswordResetCode(userData)) {
      setStepNr(2);
    } else {
      setErrorMessage(t('account-create-error'));
    }
  };

  const handlePasswordChange = async () => {
    if(1) {
      const successMessage = t('create-account-success');
      navigation.navigate('LoginView', {successMessage});
    } else {
      setErrorMessage(t('account-create-error'));
    }
  };

  return (
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} 
      accessible={false}>
    <SafeAreaView style={globalStyles.anrdoidSafeArea}>
      <View style={styles.headerContainer}>
        <FormHeader />
        {!isKeyboardVisible && (
          <Greeting text={'Forgot your password?'} />
        )}
      </View>
      {stepNr === 1 && (
        <>
        <View style={styles.textBoxContainer}>
        <UnderlineText text={'Confirm your details:'}/>
        <View style={styles.textBoxes}>
          <TextBox 
            iconName="person-icon" 
            placeHolder="Uni-ID *" 
            onChangeText={setUniId}
            value={uniId}
            autoCapitalize='none'/>
          <TextBox 
            iconName="person-icon" 
            placeHolder={t('student-code') + ' *'} 
            onChangeText={setStudentCode}
            value={studentCode}
            autoCapitalize='characters'/>
        </View>
        {!isKeyboardVisible && normalMessage && (
          <View style={styles.errorContainer}>
            <NormalMessage text={normalMessage}/>
          </View>
        )}
        </View>
        <View style={styles.buttonContainer}>
            <NormalButton 
              text={t('continue')} 
              onPress={() => {setStepNr(2)}}
              disabled={uniId == '' || studentCode == '' }/>
            <NormalLink 
              text={t('Remember your password? Log in!')} 
              onPress={() => navigation.navigate("LoginView")} />
        </View>
        </>
      )}
      {stepNr === 2 && (
        <>
        <View style={styles.textBoxContainer}>
        <UnderlineText text={`One-time key was sent to ${uniId}@taltech.ee`}/>
        <View style={styles.textBoxes}>
          <TextBox 
            iconName="key-icon" 
            placeHolder={t("One-time key *")} 
            onChangeText={setEmailCode}
            value={emailCode}/>
        </View>
        {!isKeyboardVisible && normalMessage && (
          <View style={styles.errorContainer}>
            <NormalMessage text={normalMessage}/>
          </View>
        )}
        </View>
        <View style={styles.buttonContainer}>
            <NormalLink 
              text={t('something-wrong-back')} 
              onPress={() => {setStepNr(1)}} />
            <NormalButton 
              text={t('continue')} 
              onPress={() => {setStepNr(3)}}
              disabled={uniId == '' || studentCode == '' }/>
            <NormalLink 
              text={t('Remember your password? Log in!')} 
              onPress={() => navigation.navigate("LoginView")} />
        </View>
        </>
      )}
      {stepNr === 3 && (
        <>
        <View style={styles.textBoxContainer}>
        <UnderlineText text={t('Set new password:')}></UnderlineText>
        <View style={styles.textBoxes}>
          <TextBox 
            iconName="lock-icon" 
            placeHolder={t('password')} 
            isPassword 
            onChangeText={setPassword}
            value={password}/>
          <TextBox 
            iconName="lock-icon" 
            placeHolder={t('repeat-password')} 
            isPassword 
            onChangeText={setPasswordAgain}
            value={passwordAgain}/>
        </View>
        {!isKeyboardVisible && normalMessage && (
          <View style={styles.errorContainer}>
            <NormalMessage text={normalMessage}/>
          </View>
        )}
        </View>
        <View style={styles.buttonContainer}>
            <NormalLink 
              text={t('something-wrong-back')} 
              onPress={() => {setStepNr(2)}} />
            <NormalButton 
              text={t('continue')} 
              onPress={() => {setStepNr(4)}}
              disabled={!isPasswordFormValid()}/>
            <NormalLink 
              text={t('Remember your password? Log in!')} 
              onPress={() => navigation.navigate("LoginView")} />
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
    gap: 20
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

export default ForgotPasswordView;
