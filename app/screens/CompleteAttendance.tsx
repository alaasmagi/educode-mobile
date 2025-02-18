import React, { useState, useEffect } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { useTranslation } from 'react-i18next';
import NormalHeader from '../layout/NormalHeader';
import NormalButton from '../components/NormalButton';
import ModeToggle from '../components/ModeToggle';
import StepDivider from '../components/StepDivider';
import QrGenerator from '../components/QrGenerator';
import DataText from '../components/DataText';

function QRBoardScan({ navigation , route}: NavigationProps) {
    const { userData, attendanceId, workplaceId = 0 } = route.params;
    const { t } = useTranslation();

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
                    <View style={styles.onlineToggleContainer}>
                    <ModeToggle textLeft={t("offline-mode")} textRight={t("online-mode")} onPressLeft={() => {console.log("Left pressed")}} onPressRight={() => {console.log("Right pressed")}}/>
                    </View>
                    <View style={styles.stepDividerContainer}>
                        <StepDivider label={t("step3-offline")} stepNumber={3} />
                    </View>
                    {!isKeyboardVisible && <View style={styles.qrContainer}>
                        <QrGenerator value={attendanceId + "-" + workplaceId + "-" + userData.matriculationNumber}/>
                    </View>}
                    <View style={styles.dataContainer}>
                        <DataText iconName='person-icon' text={userData.matriculationNumber}/>
                        <DataText iconName='key-icon' text={attendanceId}/>
                        <DataText iconName="work-icon" text={workplaceId == 0 ? "-" : workplaceId} />
                    </View>
                    <View style={styles.lowNavButtonContainer}>
                        <NormalButton text={t("refresh-qr")} onPress={() => {console.log("End of the flow")}}></NormalButton>
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
        flex: 1.5,
        justifyContent: "center",
    },
    onlineToggleContainer: {
        flex: 2,
        justifyContent:"center"
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
    dataContainer: {
        flex: 2,
        gap: 5,
        alignItems: "center"
    },
    lowNavButtonContainer: {
        flex: 2,
        alignItems: "center"
    }
})

export default QRBoardScan;