import React, {useEffect} from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import NormalButton from '../components/NormalButton'
import SeparatorLine from '../components/SeparatorLine';
import TextBox from '../components/TextBox';
import { useTranslation } from 'react-i18next';
import FormHeader from '../layout/FormHeader';
import Storage from '../data/LocalDataAccess';

function InitialSelection({ navigation }: NavigationProps) {
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserData = async () => {
          const storedUserData = await Storage.getData("@user_profile");
          if (storedUserData) {
            navigation.navigate('QRBoardScan', { userData: storedUserData });
          }
        };
        fetchUserData();
      }, []);

    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                    <FormHeader/>
                </View>
                <View style={styles.mainLoginContainer}>
                    <NormalButton text={t("log-in")} onPress={() => navigation.navigate('LoginView')}/>
                    <NormalButton text={t("register-as-student")} onPress={() => navigation.navigate('CreateAccountView')}/>
                </View>
                <View style={styles.alternateLoginContainer}>
                    <SeparatorLine text={t("or-use-offline-only")}/>
                    <TextBox iconName='person-icon' placeHolder={t("student-code")}/>
                    <NormalButton text={t("continue")} onPress={() => navigation.navigate('LoginView')}/>
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


export default InitialSelection;