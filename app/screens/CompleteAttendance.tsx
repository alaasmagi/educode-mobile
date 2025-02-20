import React, { useState, useEffect } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text} from 'react-native';
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

function CompleteAttendance({ navigation , route}: NavigationProps) {
    const { userData, attendanceId, workplaceId = 0 } = route.params;
    const [isOnline, setIsOnline] = useState(false);

    let {stepNr} = route.params;
    stepNr++;
    
    const { t } = useTranslation();

    const [qrValue, setQrValue] = useState(GenerateQrString(userData.matriculationNumber, attendanceId, workplaceId));

    const refreshQrCode = () => {
        setQrValue(GenerateQrString(userData.matriculationNumber, attendanceId, workplaceId));
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
                    <View style={styles.onlineToggleContainer}>
                        <ModeToggle textLeft={t("offline-mode")} textRight={t("online-mode")} onPressLeft={() => setIsOnline(false)} onPressRight={() => {setIsOnline(true)}}/>
                    </View>
                    {isOnline ? (
                        <View style={styles.onlineContainer}> 
                            <View style={styles.stepDividerContainer}>
                                <StepDivider label={t("step3-online")} stepNumber={stepNr} />
                            </View>
                            <View>
                                <DataText iconName='person-icon' text={userData.matriculationNumber}/>
                                <DataText iconName='key-icon' text={attendanceId}/>
                                <DataText iconName="work-icon" text={workplaceId == 0 ? t("no-workplace") : workplaceId} />
                            </View>
                            <View style={styles.linkContainer}>
                                <NormalLink text={t("something-wrong-back")} onPress={() => {console.log("link pressed")}}/>
                            </View>
                            <View style={styles.lowNavButtonContainer}>
                                <NormalButton text={t("check-in")} onPress={() => {console.log("hfiourehfg")}}></NormalButton>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.offlineContainer}>
                            <View style={styles.stepDividerContainer}>
                                <StepDivider label={t("step3-offline")} stepNumber={stepNr} />
                            </View>
                            {!isKeyboardVisible && <View style={styles.qrContainer}>
                                <QrGenerator value={qrValue}/>
                            </View>}
                            <View style={styles.dataContainer}>
                                <DataText iconName='person-icon' text={userData.matriculationNumber}/>
                                <DataText iconName='key-icon' text={attendanceId}/>
                                <DataText iconName="work-icon" text={workplaceId == 0 ? t("no-workplace") : workplaceId} />
                            </View>
                            <View style={styles.linkContainer}>
                                <NormalLink text={t("something-wrong-back")} onPress={() => {console.log("link pressed")}}/>
                            </View>
                            <View style={styles.lowNavButtonContainer}>
                                <NormalButton text={t("refresh-qr")} onPress={refreshQrCode}></NormalButton>
                            </View>
                        </View>
                    )}
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
        flex: 1,
        justifyContent:"center"
    },
    stepDividerContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    qrContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    onlineContainer: {
        flex: 6
    },
    offlineContainer: {
        flex: 6,
    },
    dataContainer: {
        flex: 4,
        gap: 5,
        alignItems: "center",
        justifyContent:"center"
    },
    linkContainer: {
        paddingBottom: 2,
        alignSelf:"center"
    },
    lowNavButtonContainer: {
        flex: 2,
        alignItems: "center"
    },
    
})

export default CompleteAttendance;