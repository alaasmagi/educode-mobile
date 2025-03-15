import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  preventScreenCaptureAsync,
  allowScreenCaptureAsync,
} from "expo-screen-capture";

interface QrGeneratorProperties {
  value: string;
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 250,
    borderRadius: 20,
    borderWidth: 10,
    backgroundColor: "#BCBCBD",
    borderColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
});

const QrGenerator: React.FC<QrGeneratorProperties> = ({ value }) => {
  useEffect(() => {
    preventScreenCaptureAsync();

    return () => {
      allowScreenCaptureAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <QRCode
        color="#1E1E1E"
        size={200}
        backgroundColor="#BCBCBD"
        value={value}
      />
    </View>
  );
};

export default QrGenerator;
