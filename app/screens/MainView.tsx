import React, { useState } from 'react';
import NavigationProps from '../../types'
import { SafeAreaView, Image, TextInput, StyleSheet, View, Text, } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { CameraView } from 'expo-camera';
import * as Haptics from 'expo-haptics';

function MainView({ navigation , route}: NavigationProps) {
    const { name } = route.params;


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
                <Text style={styles.greeting}>Hello, {name}</Text>
                <CameraView zoom={0.5} style={styles.camera} onBarcodeScanned={handleBarcodeScanned}/>
                <View style={globalStyles.lineContainer}>
                <View style={globalStyles.line} />
                    <Text style={globalStyles.lineText}>Or enter the ID manually</Text>
                <View style={globalStyles.line} />
            </View>
            <View style={globalStyles.inputContainer}>
            <Image source={require('../assets/icons/key-icon.png')} style={globalStyles.icon} />
                <TextInput
                value={attendanceId} 
                onChangeText={setAttendanceId}
                placeholder="Attendance ID"
                placeholderTextColor="#BCBCBD"
                style={globalStyles.input}
                />
            </View>
            <View style={globalStyles.underline} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 375,
        height: 76,
        marginBottom: 60,
    },
    camera: {
        height: 250,
        width: 250,
        borderRadius: 20,
        borderWidth: 10,
        margin: 25,
        borderColor: "#525252",
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