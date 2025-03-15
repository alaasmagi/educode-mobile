import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface SeparatorLineProperties {
  text: string;
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#BCBCBD",
  },
  lineText: {
    color: "#BCBCBD",
    fontSize: 16,
    marginHorizontal: 10,
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
