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
import NormalButton from '../components/NormalButton';
import Storage from '../data/LocalDataAccess';
import StepDivider from '../components/StepDivider';
import Checkbox from '../components/Checkbox';
import DataText from '../components/DataText';


function MainView({ navigation , route}: NavigationProps) {
    const { t } = useTranslation();
    const [scanned, setScanned] = useState(false);
    const [attendanceId, setAttendanceId] = useState('');

    const STORAGE_KEY = '@user_profile';
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
                <Text style={styles.greeting}>Hello</Text>
                <NormalButton text="LOGOUT" onPress={() => Storage.removeData(STORAGE_KEY)}/>
            </View>
            <DataText text="huifheiuhf" iconName='lock-icon' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 375,
        height: 76,
        marginBottom: 60,
    },

    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    greeting: {
        fontWeight: "bold",
        color: "#BCBCBD",
        fontSize: 36,
        marginBottom: 40,
    }
})

export default MainView;