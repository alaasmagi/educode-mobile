import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from "expo-screen-capture";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Brightness from "expo-brightness";
import { Styles } from "../styles/Styles";

interface QrGeneratorProperties {
  value: string;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.96)",
    justifyContent: "center",
    alignItems: "center",
  },
  containerNormal: {
    height: Styles["qr-generator-size"],
    width: Styles["qr-generator-size"],
    aspectRatio: 1,
    borderRadius: Styles["qr-generator-border-radius"],
    borderWidth: Styles["qr-generator-border-thickness"],
    backgroundColor: Styles["qr-generator-bg-color"],
    borderColor: Styles["qr-generator-border-color"],
    alignItems: "center",
    justifyContent: "center",
  },
  containerEnlarged: {
    height: Styles["qr-generator-enlarged-size"],
    width: Styles["qr-generator-enlarged-size"],
    aspectRatio: 1,
    borderRadius: Styles["qr-generator-border-radius"],
    borderWidth: Styles["qr-generator-border-thickness"],
    backgroundColor: Styles["qr-generator-bg-color"],
    borderColor: Styles["qr-generator-border-color"],
    alignItems: "center",
    justifyContent: "center",
  },
});

const QrGenerator: React.FC<QrGeneratorProperties> = ({ value }) => {
  const [enlarged, setIsEnlarged] = useState(false);

  const restoreBrightness = async () => {
    await Brightness.restoreSystemBrightnessAsync();
  };

  useEffect(() => {
    preventScreenCaptureAsync();
    return () => {
      allowScreenCaptureAsync();
      restoreBrightness();
    };
  }, []);

  useEffect(() => {
    if (enlarged) {
      (async () => {
        await Brightness.setBrightnessAsync(1.0);
      })();
    } else {
      restoreBrightness();
    }
  }, [enlarged]);

  return (
    <>
      {!enlarged && (
        <View style={styles.containerNormal}>
          <TouchableOpacity onPress={() => setIsEnlarged(true)}>
            <QRCode color="#1E1E1E" size={hp("25%")} backgroundColor="#E8EEF1" value={value} />
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={enlarged}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEnlarged(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setIsEnlarged(false)}>
          <View style={styles.containerEnlarged}>
            <QRCode color="#1E1E1E" size={hp("34%")} backgroundColor="#E8EEF1" value={value} />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
export default QrGenerator;
