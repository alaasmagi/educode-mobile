import React, { useState } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import NormalHeader from '../layout/NormalHeader';
import NormalButton from '../components/NormalButton';
import ModeToggle from '../components/ModeToggle';
import QrScanner from '../components/QrScanner';
import DataText from '../components/DataText';
import TextBox from '../components/TextBox';
import KeyboardVisibilityHandler from '../../hooks/KeyboardVisibilityHandler';
import UnderlineText from '../components/UnderlineText';
import { RegexFilters } from '../helpers/RegexFilters';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';


function TeacherMainView({ navigation , route}: NavigationProps) {
    const [qrScanView, setQrScanView] = useState(true);
    const isKeyboardVisible = KeyboardVisibilityHandler();
    const [scanned, setScanned] = useState(false);
    const [attendanceData, setAttendanceData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const { t } = useTranslation();

    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (!scanned) {
            setScanned(true);
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            if (RegexFilters.attendanceData.test(data)) {
               setAttendanceData(data);
               console.log(attendanceData);
            }
            else {
                setErrorMessage(t('TEST'));
            }
            setTimeout(() => setScanned(false), 2000);
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
                <View style={styles.headerContainer}>
                    <NormalHeader navigation={navigation} route={route}/>
                </View>
                <View style={styles.onlineToggleContainer}>
                    <ModeToggle 
                        textLeft={t("scan-student")} 
                        textRight={t("add-manually")} 
                        onPressLeft={() => setQrScanView(true)} 
                        onPressRight={() => setQrScanView(false)} />
                </View>
                {!isKeyboardVisible && (
                    <View style={styles.currentAttendanceContainer}>                    
                    <View style={styles.data}>
                        <DataText 
                            iconName='school-icon' 
                            text={"Tarkvaratehnika (IAX0110)"}/>
                        <DataText 
                            iconName='key-icon' 
                            text={"123128"}/>
                    </View>
                    </View>)}
                {qrScanView ? (
                    <View style={styles.qrScannerContainer}>
                        <QrScanner onQrScanned={handleBarcodeScanned}/>
                    </View>
                ) : (
                    <>
                        {(successMessage && !isKeyboardVisible) ?? (
                            <SuccessMessage text={successMessage}/>
                        )}
    	                {(errorMessage && !isKeyboardVisible) ?? (
                            <ErrorMessage text={errorMessage}/>
                        )}
                        <View style={styles.manualInputContainer}>
                            <View style={styles.textBoxes}>
                                <TextBox iconName={"person-icon"} placeHolder={t("student-code") + "*"}/>
                                <TextBox iconName={"work-icon"} placeHolder={t("workplace-id")}/>
                            </View>
                            <NormalButton text={t("add-manually")} onPress={console.log}/>
                        </View>
                    </>
                )}
                {!isKeyboardVisible && (
                    <View style={styles.lastAddedStudentContainer}>
                    <UnderlineText text={t("last-student")}/>
                    <View style={styles.data}>
                        <DataText 
                            iconName='person-icon' 
                            text={"213453IACB"}/>
                        <DataText 
                            iconName="work-icon" 
                            text={"123456"} />
                    </View>
                </View>
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
    currentAttendanceContainer: {
        flex: 1,
        justifyContent: "center"
    },
    qrScannerContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    textBoxes: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap:25
    },
    manualInputContainer: {
        flex: 3,
        gap:20,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    lastAddedStudentContainer: {
        flex: 1.5,
        justifyContent: "flex-end"
    },
    data: {
        alignSelf: "center",
        width: "85%",
        borderWidth: 2,
        borderColor: "#BCBCBD",
        borderRadius: 20,
        gap: 10,
        padding: 10
    }
})

export default TeacherMainView;