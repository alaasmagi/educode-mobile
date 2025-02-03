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
            <View style={styles.view}>
                
                <QrScanner onQrScanned={handleBarcodeScanned}/>
                <SeparatorLine text={t("or-enter-id-manually")}/>
                <TextBox iconName='key-icon' placeHolder={t("attendance-id")} value={attendanceId} onChangeText={setAttendanceId}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
        
    },
})

export default MainView;