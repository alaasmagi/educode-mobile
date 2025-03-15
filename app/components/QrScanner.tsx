import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { Icons } from './Icons';

interface QrScannerProperties {
    onQrScanned: (event: { data: string }) => void;
}

const styles = StyleSheet.create({
    camera: {
        height: 250,
        width: 250,
        borderRadius: 20,
        borderWidth: 10,
        borderColor: "#525252",
    },
    text: {
        color: '#BCBCBD',
        fontSize: 23,
        fontWeight: "bold",
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    container: {
        paddingLeft: "10%",
        flexDirection: "row",
        gap: 5
    },
    sideContainer: {
        justifyContent: "center",
        gap: 25
    },
    buttonsContainer: {
        gap: 10
    }
});
const QrScanner: React.FC<QrScannerProperties> = ({ onQrScanned }) => {
    const [zoom, setZoom] = useState<number>(0.25);
    return (
        <View style={styles.container}>
            <CameraView zoom={zoom} style={styles.camera} onBarcodeScanned={onQrScanned}/>
            <View style={styles.sideContainer}>
            <Image style={styles.image} source={Icons['zoom-icon']}/>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => setZoom(0.25)}>
                        <Text style={styles.text}>1x</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setZoom(0.5)}>
                        <Text style={styles.text}>2x</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default QrScanner;