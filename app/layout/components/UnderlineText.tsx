import React from "react";
import { StyleSheet, Text } from "react-native";
import { ApplyStyles } from "../../businesslogic/hooks/SelectAppTheme";

interface UnderlineTextProperties {
  text: string;
}

const UnderlineText: React.FC<UnderlineTextProperties> = ({ text }) => {
  const { styles } = ApplyStyles();

  const sheet = StyleSheet.create({
    text: {
      color: styles["underline-text-font-color"],
      fontSize: styles["underline-text-font-size"],
      textDecorationLine: "underline",
      textAlign: "center",
      alignSelf: "center",
      margin: 5,
    },
  });

  return <Text style={sheet.text}>{text}</Text>;
};

export default UnderlineText;