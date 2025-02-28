import React, { useState } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text} from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { useTranslation } from 'react-i18next';
import NormalHeader from '../layout/NormalHeader';
import NormalButton from '../components/NormalButton';
import ModeToggle from '../components/ModeToggle';
import StepDivider from '../components/StepDivider';
import QrGenerator from '../components/QrGenerator';
import DataText from '../components/DataText';
import { GenerateQrString } from '../businesslogic/QrGenLogic';
import NormalLink from '../components/NormalLink';
import KeyboardVisibilityHandler from '../../hooks/KeyboardVisibilityHandler';
import UnderlineText from '../components/UnderlineText';

function CompleteAttendanceView({ navigation , route}: NavigationProps) {
    const { userData, attendanceId, workplaceId = 0 } = route.params;
    const [isOnline, setIsOnline] = useState(false);
    const isKeyboardVisible = KeyboardVisibilityHandler();
    let {stepNr} = route.params;
    stepNr++;
    
    const { t } = useTranslation();

    const [qrValue, setQrValue] = useState(GenerateQrString(userData.matriculationNumber, attendanceId, workplaceId));

    const refreshQrCode = () => {
        setQrValue(GenerateQrString(userData.matriculationNumber, attendanceId, workplaceId));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
                <View style={styles.headerContainer}>
                    <NormalHeader navigation={navigation} route={route}/>
                </View>
                <View style={styles.onlineToggleContainer}>
                    <ModeToggle 
                    textLeft={t("offline-mode")} 
                    textRight={t("online-mode")} 
                    onPressLeft={() => setIsOnline(false)} 
                    onPressRight={() => setIsOnline(true)}
                    />
                </View>
                {isOnline ? (
                    <> 
                        <View style={styles.stepDividerContainer}>
                            <StepDivider label={t("step-end-attendance")} stepNumber={stepNr} />
                        </View>
                        <UnderlineText text="Verify your details:"/>
                        <View style={styles.dataContainer}>
                            <DataText iconName='person-icon' text={userData.fullName}/>
                            <DataText iconName='key-icon' text={attendanceId}/>
                            <DataText iconName="work-icon" text={workplaceId == 0 ? t("no-workplace") : workplaceId} />
                        </View>
                        <View style={styles.linkContainer}>
                            <NormalLink text={t("something-wrong-back")} onPress={() => {console.log("link pressed")}}/>
                        </View>
                        <View style={styles.lowNavButtonContainer}>
                            <NormalButton text={t("check-in")} onPress={() => {console.log("hfiourehfg")}}></NormalButton>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.stepDividerContainer}>
                            <StepDivider label={t("step-show-qr")} stepNumber={stepNr} />
                        </View>
                        {!isKeyboardVisible && <View style={styles.qrContainer}>
                            <QrGenerator value={qrValue}/>
                        </View>}
                        <View style={styles.dataContainer}>
                            <DataText iconName='person-icon' text={userData.studentCode}/>
                            <DataText iconName='key-icon' text={attendanceId}/>
                            <DataText iconName="work-icon" text={workplaceId == 0 ? t("no-workplace") : workplaceId} />
                        </View>
                        <View style={styles.linkContainer}>
                            <NormalLink text={t("something-wrong-back")} 
                            onPress={() => {navigation.navigate("StudentMainView", {userData, attendanceId, workplaceId, stepNr: stepNr - 1})}}/>
                        </View>
                        <View style={styles.lowNavButtonContainer}>
                            <NormalButton text={t("refresh-qr")} onPress={refreshQrCode}></NormalButton>
                        </View>
                    </>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    headerContainer:{
        flex: 1.5,
        justifyContent: "center",
    },
    onlineToggleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    stepDividerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    qrContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    dataContainer: {
        flex: 2,
        gap: 5,
        alignItems: "center",
        justifyContent:"center"
    },
    linkContainer: {
        paddingBottom: 4,
        alignSelf:"center"
    },
    lowNavButtonContainer: {
        flex: 1.5,
        alignItems: "center"
    }
})

export default CompleteAttendanceView;