import React, {useEffect, useCallback, useState} from 'react';
import NavigationProps from '../../types'
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, View, BackHandler, Alert } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import NormalButton from '../components/NormalButton'
import SeparatorLine from '../components/SeparatorLine';
import TextBox from '../components/TextBox';
import { useTranslation } from 'react-i18next';
import FormHeader from '../layout/FormHeader';
import Storage from '../data/LocalDataAccess';
import BackButtonHandler from '../../hooks/BackButtonHandler';
import User from '../models/UserData';


function InitialSelectionView({ navigation }: NavigationProps) {
    const { t } = useTranslation();
    const [studentCode, setStudentCode] = useState('');

    BackButtonHandler(navigation);
    useFocusEffect(
        useCallback(() => {
          const backAction = () => {
            Alert.alert(t("exit-app"), t("exit-app-prompt"), [
              { text: t("cancel"), onPress: () => null, style: "cancel" },
              { text: t("yes"), onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
          const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
          
          return () => backHandler.remove();
        }, []));

    useEffect(() => {
        const fetchUserData = async () => {
          const storedUserData:User|null = await Storage.getData(process.env.EXPO_PUBLIC_LOCAL_DATA);
          if (storedUserData) {
            storedUserData.userType.userType === "Teacher" ? 
            navigation.navigate('TeacherMainView', { storedUserData }) :
            navigation.navigate('StudentMainView', { storedUserData });
           }
        };
        fetchUserData();
      }, []);

      const handleOfflineLogin = () => {
        const userData = {
            studentCode: studentCode
        }

        Storage.saveData(process.env.EXPO_PUBLIC_LOCAL_DATA, userData);
        navigation.navigate('StudentMainView', {userData});
      };

    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.headerContainer}>
                <FormHeader/>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.mainLoginContainer}>
                    <NormalButton text={t("log-in")} onPress={() => navigation.navigate('LoginView')}/>
                    <NormalButton text={t("register-as-student")} onPress={() => navigation.navigate('CreateAccountView')}/>
                </View>
                <View style={styles.alternateLoginContainer}>
                    <SeparatorLine text={t("or-use-offline-only")}/>
                    <TextBox iconName='person-icon' placeHolder={t("student-code")} onChangeText={setStudentCode} value={studentCode} autoCapitalize='characters'/>
                    <NormalButton text={t("continue")} onPress={handleOfflineLogin}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer : {
        flex: 4
    },
    headerContainer:{
        flex: 1.5,
        justifyContent: "flex-end"
    },
    mainLoginContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 2,
        gap: 25
    },
    alternateLoginContainer: {
        flex: 2.1,
        justifyContent:"center",
        alignItems:"center",
        gap: 25
    }
});


export default InitialSelectionView;