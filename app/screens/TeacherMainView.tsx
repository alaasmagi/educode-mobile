import React, { useState } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import NormalHeader from '../layout/NormalHeader';
import NormalButton from '../components/NormalButton';
import ModeToggle from '../components/ModeToggle';
import StepDivider from '../components/StepDivider';
import QrScanner from '../components/QrScanner';
import DataText from '../components/DataText';
import NormalLink from '../components/NormalLink';
import KeyboardVisibilityHandler from '../../hooks/KeyboardVisibilityHandler';
import UnderlineText from '../components/UnderlineText';
import { RegexFilters } from '../helpers/RegexFilters';
import StudentDataCell from '../components/StudentDataCell';
import StudentsDataTableHeader from '../components/StudentsDataTableHeader';
import StudentsTable from '../layout/StudentsTable';
import StudentAttendanceModel from '../models/StudentAttendanceModel';


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

    const studentsData: StudentAttendanceModel[] = Array.from({ length: 20 }, (_, index) => ({
        attendaceCheckId: 1,
        studentCode: `213453IACB`,
    }));

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
                <View style={styles.headerContainer}>
                    <NormalHeader navigation={navigation} route={route}/>
                </View>
                <View style={styles.onlineToggleContainer}>
                    <ModeToggle 
                        textLeft={t("add-student")} 
                        textRight={t("view-students")} 
                        onPressLeft={() => setQrScanView(true)} 
                        onPressRight={() => setQrScanView(false)} />
                </View>
                <View style={styles.dataContainer}>
                    <UnderlineText text={t("current-attendance")}/>
                    <View style={styles.data}>
                        <DataText 
                            iconName='school-icon' 
                            text={"userData.fullName"}/>
                        <DataText 
                            iconName='key-icon' 
                            text={"attendanceId"}/>
                    </View>
                        </View>
                {qrScanView ? (
                    <> 
                        {!isKeyboardVisible && <View style={styles.qrContainer}>
                            <QrScanner onQrScanned={handleBarcodeScanned}/>
                        </View>}
                        <View style={styles.dataContainer}>
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
                    </>
                ) : (
                    <>
                        <UnderlineText text={t("students-in-current-attendance")}/>
                        <View style={styles.dataContainer}>
                            <StudentsTable students={studentsData}/>                  
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
        flex: 3,
        gap: 5,
        alignItems: "center",
        justifyContent:"center"
    },
    data: {
        alignSelf: "center",
        width: "80%",
        borderWidth: 2,
        borderColor: "#BCBCBD",
        borderRadius: 20,
        gap: 25,
        padding: 10
    },
    linkContainer: {
        paddingBottom: 4,
        alignSelf:"center"
    },
    lowNavButtonContainer: {
        flex: 1,
        alignItems: "center"
    }
})

export default TeacherMainView;