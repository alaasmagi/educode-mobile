import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Animated } from "react-native";
import { CameraView } from "expo-camera";
import { Icons } from "./Icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { EQrStatus } from "../../models/EQrStatus";

interface QrScannerProperties {
  onQrScanned: (event: { data: string }) => void;
  qrStatus: EQrStatus;
}

const styles = StyleSheet.create({
  animatedViewContainer: {
    height: hp("32%"),
    width: hp("32%"),
  },
  camera: {
    aspectRatio: 1,
    borderRadius: wp("8%"),
    borderWidth: wp("4%"),
    borderColor: "#515151",
  },
  text: {
    color: "#E8EEF1",
    fontSize: wp("6%"),
    fontWeight: "bold",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("0.5%"),
  },
  icon: {
    width: wp("9.5%"),
    height: wp("9.5%"),
    resizeMode: "contain",
  },
  container: {
    paddingLeft: wp("8%"),
    flexDirection: "row",
    gap: wp("1%"),
  },
  sideContainer: {
    justifyContent: "center",
    gap: hp("3%"),
  },
  buttonsContainer: {
    gap: hp("1%"),
  },
});
const QrScanner: React.FC<QrScannerProperties> = ({ onQrScanned, qrStatus }) => {
  const [zoom, setZoom] = useState<number>(0.25);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (qrStatus === EQrStatus.Incorrect) {
      shakeAnim.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]).start();
    }
  }, [qrStatus]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedViewContainer, { transform: [{ translateX: shakeAnim }] }]}>
        <CameraView
          zoom={zoom}
          style={[
            styles.camera,
            {
              borderColor:
                qrStatus === EQrStatus.Incorrect ? "#DD2D4A" : qrStatus === EQrStatus.Correct ? "#2DD452" : "#515151",
            },
          ]}
          onBarcodeScanned={onQrScanned}
        />
      </Animated.View>
      <View style={styles.sideContainer}>
        <Image style={styles.icon} source={Icons["zoom-icon"]} />

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
