import React, { useState, useEffect, useCallback} from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, StyleSheet, View, Alert, BackHandler} from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import SeparatorLine from '../components/SeparatorLine';
import TextBox from '../components/TextBox';
import { useTranslation } from 'react-i18next';
import NormalButton from '../components/NormalButton';
import SuccessMessage from '../components/SuccessMessage';
import BackButtonHandler from '../../hooks/BackButtonHandler';
import NormalHeader from '../layout/NormalHeader'
import { DeleteOfflineUserData } from '../businesslogic/UserDataOffline';
import { DeleteUser } from '../businesslogic/UserDataOnline';
import { useFocusEffect } from "@react-navigation/native";


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


    const handleBackToHome = () => {
        localData.userType == "Student" ? navigation.navigate("StudentMainView", { localData }) :
        navigation.navigate("TeacherMainView", {localData})
    };

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
        },
    []));

    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.headerContainer}>
                <NormalHeader navigation={navigation} route={route}/>
            </View>
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
                <TextBox iconName='person-icon' onChangeText={setConfirmationText} placeHolder={t("type-delete")}/>
                <NormalButton text={t("delete-account")} disabled={confirmationText !== "DELETE"} onPress={handleDelete}/>
            </View>
            <View style={styles.lowButtonContainer}>
            <NormalButton text={t("back-to-home")} onPress={handleBackToHome}/>
            <NormalButton text={t("log-out")} onPress={handleLogout}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
      },
    changePassword: {
        flex: 1,
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
        flex: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    lowButtonContainer: {
        flex: 2,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default SettingsView;