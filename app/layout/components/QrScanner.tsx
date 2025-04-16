import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { CameraView } from "expo-camera";
import { Icons } from "./Icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface QrScannerProperties {
  onQrScanned: (event: { data: string }) => void;
}

const styles = StyleSheet.create({
  camera: {
    height: wp("70%"),
    width: wp("70%"),
    aspectRatio: 1,
    borderRadius: wp("5%"),
    borderWidth: wp("3%"),
    borderColor: "#525252",
  },
  text: {
    color: "#BCBCBD",
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
const QrScanner: React.FC<QrScannerProperties> = ({ onQrScanned }) => {
  const [zoom, setZoom] = useState<number>(0.25);
  return (
    <View style={styles.container}>
      <CameraView zoom={zoom} style={styles.camera} onBarcodeScanned={onQrScanned} />
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
