import React, { useState, useEffect } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, Image, TextInput, StyleSheet, View, Text, } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import SeparatorLine from '../components/SeparatorLine';
import TextBox from '../components/TextBox';
import { useTranslation } from 'react-i18next';
import NormalButton from '../components/NormalButton';
import Storage from '../data/LocalDataAccess';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import NormalHeader from '../layout/NormalHeader'
import Greeting from '../components/Greeting';
import { DeleteOfflineUserData } from '../businesslogic/UserDataOffline';
import { DeleteUser } from '../businesslogic/UserDataOnline';


function SettingsView({navigation, route}: NavigationProps) {
    const { t } = useTranslation();
    const {localData} = route.params;
    const [isOfflineOnly, setIsOfflineOnly] = useState(false);
    const [confirmationText, setConfirmationText] = useState<string|null>(null);
    const [newStudentCode, setNewStudentCode] = useState<string|null>(null);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    
    useEffect(() => {
            if (localData.uniId == null) {
                setIsOfflineOnly(true);
            }
        }, [localData.uniId]);


    const handleDelete = async () => {
        if(await DeleteUser(localData.uniId)) {
            await DeleteOfflineUserData();
            navigation.navigate("InitialSelectionView");
        } else {
            setErrorMessage(t("account-deletion-error"));
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }
    
    const handleLogout = async () => {
        await DeleteOfflineUserData();
        navigation.navigate("InitialSelectionView");
    }



    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.headerContainer}>
                <NormalHeader navigation={navigation} route={route}/>
            </View>
            <View style={styles.mainContainer}>
                {!isOfflineOnly && (
                    <View style={styles.changePassword}>
                        <NormalButton text={t('change-password')} onPress={() => navigation.navigate("ForgotPasswordView", { isNormalPassChange: true, localData })}/>
                    </View>
                )}

                {isOfflineOnly && (
                    <View style={styles.changeStudentCode}>
                        <SeparatorLine text={t("offline-mode-settings")}/>
                        <TextBox iconName='person-icon' placeHolder={t("student-code")}/>
                        <NormalButton text={t("save-account-changes")} onPress={() => console.log("Button pressed")}/>
                    </View>
                )}

                <View style={styles.deleteAccount}>
                    <SeparatorLine text={t("delete-account")}/>
                    <TextBox iconName='person-icon' placeHolder={t("type-delete")}/>
                    <NormalButton text={t("delete-account")} disabled={confirmationText !== "DELETE"} onPress={handleDelete}/>
                </View>
            </View>
            <View style={styles.lowButtonContainer}>
            <NormalButton text={t("log-out")} onPress={handleLogout}/>
            </View>      
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 2,
        gap: 70,
        justifyContent: 'flex-end',
      },
    mainContainer: {
        flex: 13,
        justifyContent: "center",
        alignItems: "center",
        gap: 55
    },
    changePassword: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    changeStudentCode: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    deleteAccount: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    lowButtonContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default SettingsView;