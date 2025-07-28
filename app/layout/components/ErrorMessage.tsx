import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from "./Icon";
import { IconContent } from "./Icons";

interface ErrorMessageProperties {
  text: string | null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Styles["alert-card-background-color"],
    padding: 10,
    width: "100%",
    borderRadius: Styles["message-card-border-radius"],
    borderColor: Styles["alert-card-border-color"],
    borderWidth: Styles["message-card-border-thickness"],
  },
  icon: {
    width: "15%",
  },
  content: {
    width: "85%",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Styles["message-card-font-size"],
    color: Styles["alert-font-color"],
  },
});

const ErrorMessage: React.FC<ErrorMessageProperties> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          size={Styles["message-card-icon-size"]}
          iconContent={IconContent["alert-icon"]}
          color={Styles["alert-font-color"]}
          strokeWidth={Styles["message-card-icon-thickness"]}
        />
      </View>
      <Text style={styles.content}>{text}</Text>
    </View>
  );
};

export default ErrorMessage;
