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


function SettingsView({navigation, route}: NavigationProps) {
    const { t } = useTranslation();
    const {localData} = route.params;
    const [isOfflineOnly, setIsOfflineOnly] = useState(false);
    
    
    useEffect(() => {
            if (localData.uniId == null) {
                setIsOfflineOnly(true);
            }
        }, [localData.uniId]);

    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.headerContainer}>
                <NormalHeader navigation={navigation} route={route}/>
            </View>
            <View style={styles.mainContainer}>
                {!isOfflineOnly && (
                    <View style={styles.changePassword}>
                        <NormalButton text={t('ChangePassword')} onPress={() => navigation.navigate("ForgotPasswordView", { isNormalPassChange: true })}/>
                    </View>
                )}

                {isOfflineOnly && (
                    <View style={styles.changeStudentCode}>
                        <SeparatorLine text={t("OfflineModeSettings")}/>
                        <TextBox iconName='person-icon' placeHolder={t("StudentCode")}/>
                        <NormalButton text={t("SaveChanges")} onPress={() => console.log("Button pressed")}/>
                    </View>
                )}

                <View style={styles.deleteAccount}>
                    <SeparatorLine text={t("DeleteAccount")}/>
                    {!isOfflineOnly && <TextBox iconName='person-icon' placeHolder={t("password")}/>}
                    <TextBox iconName='person-icon' placeHolder={t("Type 'DELETE'")}/>
                    <NormalButton text={t("DeleteAccount")} onPress={() => console.log(localData.studentCode)}/>
                </View>
            </View>
            <View style={styles.lowButtonContainer}>
            <NormalButton text={t("log-out")} onPress={() => {Storage.removeData(process.env.EXPO_PUBLIC_LOCAL_DATA), navigation.navigate("InitialSelectionView")}}/>

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