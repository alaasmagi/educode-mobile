import React from "react";
import { StyleSheet, Text } from "react-native";
import { Styles } from "../styles/Styles";

interface UnderlinetextProperties {
  text: string;
}

const styles = StyleSheet.create({
  text: {
    color: Styles["underline-text-font-color"],
    fontSize: Styles["underline-text-font-size"],
    textDecorationLine: "underline",
    textAlign: "center",
    alignSelf: "center",
    margin: 5,
  },
});

const UnderlineText: React.FC<UnderlinetextProperties> = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default UnderlineText;
