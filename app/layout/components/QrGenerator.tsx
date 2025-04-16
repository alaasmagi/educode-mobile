import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from "expo-screen-capture";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface QrGeneratorProperties {
  value: string;
}

const styles = StyleSheet.create({
  container: {
    height: wp("75%"),
    width: wp("75%"),
    borderRadius: wp("5%"),
    borderWidth: wp("3%"),
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
      <QRCode color="#1E1E1E" size={wp("60%")} backgroundColor="#BCBCBD" value={value} />
    </View>
  );
};

export default QrGenerator;
