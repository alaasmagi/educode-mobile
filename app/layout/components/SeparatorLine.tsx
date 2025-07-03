import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface SeparatorLineProperties {
  text: string;
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("90%"),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E8EEF1",
  },
  lineText: {
    color: "#E8EEF1",
    fontSize: wp("4%"),
    marginHorizontal: wp("2%"),
  },
});

const SeparatorLine: React.FC<SeparatorLineProperties> = ({ text }) => {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.line} />
      <Text style={styles.lineText}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default SeparatorLine;
