import React, { useState, useEffect, useCallback } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard, BackHandler, Alert} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import globalStyles from '../styles/GlobalStyles';
import * as Haptics from 'expo-haptics';
import SeparatorLine from '../components/SeparatorLine';
import TextBox from '../components/TextBox';
import QrScanner from '../components/QrScanner';
import { useTranslation } from 'react-i18next';
import NormalHeader from '../layout/NormalHeader';
import NormalButton from '../components/NormalButton';
import StepDivider from '../components/StepDivider';
import Checkbox from '../components/Checkbox';
import DataText from '../components/DataText';

function QRBoardScan({ navigation , route}: NavigationProps) {
    const {userData} = route.params;
    const { t } = useTranslation();
    const [scanned, setScanned] = useState(false);
    const [attendanceId, setAttendanceId] = useState('');
    const [scanForWorkplace, setScanForWorkplace] = useState(false);
    let stepNr = 1;
    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (!scanned) {
            setScanned(true);
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); 
            console.log("Scanned Data:", data); 
            setAttendanceId(data);
            setTimeout(() => setScanned(false), 5000);
        }
    };


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
    

    const handleNextStep = () => {
        if (scanForWorkplace == true) {
            navigation.navigate("QRWorkplaceScan", { userData, attendanceId, stepNr });
        }
        else {
            navigation.navigate("CompleteAttendance", { userData, attendanceId, stepNr });
        }
    } 

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
                <View style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                        <NormalHeader navigation={navigation} route={route}/>
                    </View>
                    <View style={styles.stepDividerContainer}>
                        <StepDivider label={t("step1-online-offline")} stepNumber={stepNr} />
                    </View>
                    {!isKeyboardVisible && <View style={styles.qrContainer}>
                        <QrScanner onQrScanned={handleBarcodeScanned}/>
                    </View>}
                    <View style={styles.alternativeMethodContainer}>
                        <SeparatorLine text={t("or-enter-id-manually")}/>
                        <TextBox iconName='key-icon' placeHolder={t("attendance-id")} value={attendanceId} onChangeText={setAttendanceId}/>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox label={t("add-workplace")} onChange={() => setScanForWorkplace(prev => !prev)}/>
                    </View>
                    <View style={styles.lowNavButtonContainer}>
                        <NormalButton text={t("continue")} onPress={handleNextStep}></NormalButton>
                    </View>
                </View>   
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: "center"
    },
    headerContainer:{
        flex: 2,
        justifyContent: "center",
    },
    stepDividerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    qrContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    alternativeMethodContainer: {
        flex: 2,
        gap: 25,
        alignItems: "center"
    },
    checkboxContainer:{
        flex: 1,
        alignItems: "center"
    },
    lowNavButtonContainer: {
        flex: 2,
        alignItems: "center"
    }
})

export default QRBoardScan;