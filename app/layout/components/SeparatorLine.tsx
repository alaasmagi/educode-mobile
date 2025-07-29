import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Styles } from "../styles/Styles";

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
    height: Styles["separator-line-thickness"],
    backgroundColor: Styles["separator-line-color"],
  },
  lineText: {
    color: Styles["separator-line-font-color"],
    fontSize: Styles["separator-line-font-size"],
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
