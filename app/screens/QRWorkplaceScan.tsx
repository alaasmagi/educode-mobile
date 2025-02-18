import React, { useState, useEffect } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
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
import NormalLink from '../components/NormalLink';

function QRWorkPlaceScan({ navigation , route}: NavigationProps) {
    const {userData, attendanceId} = route.params;
    let {stepNr} = route.params;
    stepNr++;
    const { t } = useTranslation();
    const [scanned, setScanned] = useState(false);
    const [workplaceId, setWorkplaceId] = useState('');

    

    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (!scanned) {
            setScanned(true);
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); 
            console.log("Scanned Data:", data); 
            setWorkplaceId(data);
            setTimeout(() => setScanned(false), 5000);
        }
    };

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
                        <StepDivider label={t("step2-online-offline")} stepNumber={stepNr} />
                    </View>
                    {!isKeyboardVisible && <View style={styles.qrContainer}>
                        <QrScanner onQrScanned={handleBarcodeScanned}/>
                    </View>}
                    <View style={styles.alternativeMethodContainer}>
                        <SeparatorLine text={t("or-enter-id-manually")}/>
                        <TextBox iconName='work-icon' placeHolder={t("workplace-id")} value={workplaceId} onChangeText={setWorkplaceId}/>
                    </View>
                    <View style={styles.linkContainer}>
                        <NormalLink text={t("something-wrong-back")} onPress={() => {console.log("link pressed")}}/>
                    </View>
                    <View style={styles.lowNavButtonContainer}>
                        <NormalButton text={t("continue")} onPress={() => navigation.navigate("CompleteAttendance", {userData, attendanceId, workplaceId, stepNr})}></NormalButton>
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
    linkContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    lowNavButtonContainer: {
        flex: 2,
        gap: 5,
        alignItems: "center"
    }
})

export default QRWorkPlaceScan;