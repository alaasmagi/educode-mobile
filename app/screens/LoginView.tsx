import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
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
import { GetUserDataByUniId } from '../businesslogic/UserDataOnline';

function LoginView({ navigation }: NavigationProps) {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [uniId, setUniId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const STORAGE_KEY = '@user_profile';

  const handleLogin = async () => {
    const response = await requestPermission();
    if (!response.granted) {
      Alert.alert('Permission Denied', 'You need to allow camera access to continue.');
      return;
    }

    const userData = await GetUserDataByUniId(uniId);
    
    if (userData) {
      navigation.navigate('QRBoardScan', { userData });
      Storage.saveData(STORAGE_KEY, userData);
    } else {
      Alert.alert('Error', 'User not found.');
  }
  };

  return (
    <SafeAreaView style={globalStyles.anrdoidSafeArea}>
      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <FormHeader />
          <Greeting text={t('oh-hello-again')} />
        </View>
        <View style={styles.textBoxContainer}>
          <View style={styles.textBoxes}>
            <TextBox iconName="person-icon" placeHolder="Uni-ID" onChangeText={setUniId} />
            <TextBox iconName="lock-icon" placeHolder={t('password')} isPassword onChangeText={setPassword} />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <NormalLink text={t('forgot-password')} onPress={() => console.log('Link pressed')} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <NormalButton text={t('log-in')} onPress={handleLogin} />
          <NormalLink text={t('register-now')} onPress={() => console.log('Link pressed')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignContent: 'center',
  },
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginView;
