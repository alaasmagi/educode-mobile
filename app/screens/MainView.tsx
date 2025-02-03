import React, { useState } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, Image, TextInput, StyleSheet, View, Text, } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import * as Haptics from 'expo-haptics';
import SeparatorLine from '../components/SeparatorLine';
import TextBox from '../components/TextBox';
import QrScanner from '../components/QrScanner';
import QrGenerator from '../components/QrGenerator';
import { useTranslation } from 'react-i18next';
import Header from '../layout/NormalHeader';
import NormalHeader from '../layout/NormalHeader';
import NormalButton from '../components/NormalButton';

function MainView({ navigation , route}: NavigationProps) {
    const { name } = route.params;
    const { t } = useTranslation();
    const [scanned, setScanned] = useState(false);
    const [attendanceId, setAttendanceId] = useState('');

    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (!scanned) {
            setScanned(true);
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); 
            console.log("Scanned Data:", data); 
            
            setAttendanceId(data);
            setTimeout(() => setScanned(false), 5000);
        }
    };

    return (
        <SafeAreaView style = {globalStyles.anrdoidSafeArea}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <NormalHeader navigation={navigation} route={route}/>
                </View>
                <View style={styles.onlineToggleContainer}>

                </View>
                <View style={styles.qrContainer}>
                    <QrScanner onQrScanned={handleBarcodeScanned}/>
                </View>
                <View style={styles.alternativeMethodContainer}>
                    <SeparatorLine text={t("or-enter-id-manually")}/>
                    <TextBox iconName='key-icon' placeHolder={t("attendance-id")} value={attendanceId} onChangeText={setAttendanceId}/>
                </View>
                <View style={styles.lowNavButtonContainer}>
                    <NormalButton text={t("continue")} onPress={() => {console.log("Button pressed")}}></NormalButton>
                </View>
            </View>
        </SafeAreaView>
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
        flex: 1
    },
    qrContainer: {
        flex: 5,
        justifyContent: "center",
    },
    alternativeMethodContainer: {
        flex: 2,
        gap: 25
    },
    lowNavButtonContainer: {
        flex: 2
    }
})

export default MainView;