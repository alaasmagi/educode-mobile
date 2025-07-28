import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface DataTextProperties {
  label: string;
  text: string;
}

const DataText: React.FC<DataTextProperties> = ({ label, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label + ": "}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: hp("1%"),
    width: wp("90%"),
  },
  text: {
    color: "#E8EEF1",
    fontSize: wp("5%"),
  },
  label: {
    color: "#E8EEF1",
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
});

export default DataText;
