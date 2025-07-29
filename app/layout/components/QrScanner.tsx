import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { CameraView } from "expo-camera";
import { IconContent } from "./Icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { EQrStatus } from "../../models/EQrStatus";
import Icon from "./Icon";
import { Styles } from "../styles/Styles";

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
    borderRadius: Styles["qr-scanner-camera-border-radius"],
    borderWidth: Styles["qr-scanner-camera-border-width"],
  },
  text: {
    color: Styles["qr-scanner-font-color"],
    fontSize: Styles["qr-scanner-font-size"],
    fontWeight: "bold",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("0.5%"),
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
                qrStatus === EQrStatus.Incorrect
                  ? Styles["qr-scanner-camera-border-alert-color"]
                  : qrStatus === EQrStatus.Correct
                  ? Styles["qr-scanner-camera-border-success-color"]
                  : Styles["qr-scanner-camera-border-normal-color"],
            },
          ]}
          onBarcodeScanned={onQrScanned}
        />
      </Animated.View>
      <View style={styles.sideContainer}>
        <Icon
          size={Styles["qr-scanner-icon-size"]}
          color={Styles["qr-scanner-icon-color"]}
          iconContent={IconContent["zoom-icon"]}
          strokeWidth={Styles["qr-scanner-icon-thickness"]}
        />

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
