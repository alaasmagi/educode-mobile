import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from "expo-screen-capture";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Brightness from "expo-brightness";

interface QrGeneratorProperties {
  value: string;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  containerNormal: {
    height: hp("32%"),
    width: hp("32%"),
    aspectRatio: 1,
    borderRadius: wp("8%"),
    borderWidth: wp("4%"),
    backgroundColor: "#E8EEF1",
    borderColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
  containerEnlarged: {
    height: hp("42%"),
    width: hp("42%"),
    aspectRatio: 1,
    borderRadius: wp("8%"),
    borderWidth: wp("4%"),
    backgroundColor: "#E8EEF1",
    borderColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
});

const QrGenerator: React.FC<QrGeneratorProperties> = ({ value }) => {
  const [enlarged, setIsEnlarged] = useState(false);
  const originalBrightness = useRef<number | null>(null);
  const clampBrightness = (b: number) => Math.max(0.1, Math.min(b, 1.0));

  const restoreBrightness = async () => {
    if (originalBrightness.current !== null) {
      await Brightness.setBrightnessAsync(clampBrightness(originalBrightness.current));
      originalBrightness.current = null;
    }
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
        if (originalBrightness.current === null) {
          const current = await Brightness.getBrightnessAsync();
          originalBrightness.current = clampBrightness(current);
          console.log("Saved user brightness:", originalBrightness.current);
        }
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
      <Modal visible={enlarged} transparent animationType="fade" onRequestClose={() => setIsEnlarged(false)}>
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
