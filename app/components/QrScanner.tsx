import React from 'react';
import { StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

interface QrScannerProperties {
    zoom?: number;
    onQrScanned: (event: { data: string }) => void;}

const styles = StyleSheet.create({
    camera: {
        height: 250,
        width: 250,
        borderRadius: 20,
        borderWidth: 10,
        margin: 25,
        borderColor: "#525252",
    }
});


const QrScanner: React.FC<QrScannerProperties> = ({ zoom, onQrScanned }) => {
    return (
        <CameraView zoom={0.5} style={styles.camera} onBarcodeScanned={onQrScanned}/>
    );
};

export default QrScanner;