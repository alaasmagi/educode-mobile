import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Styles } from "../styles/Styles";
import { IconContent } from "./Icons";
import Icon from "./Icon";

interface SuccessMessageProperties {
  text: string | null;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Styles["success-card-background-color"],
    padding: 10,
    borderRadius: Styles["message-card-border-radius"],
    borderColor: Styles["success-card-border-color"],
    borderWidth: Styles["message-card-border-thickness"],
  },
  icon: {
    width: "15%",
  },
  content: {
    width: "85%",
    fontWeight: "bold",
    textAlign: "center",
    color: Styles["success-font-color"],
    fontSize: Styles["message-card-font-size"],
  },
});

const SuccessMessage: React.FC<SuccessMessageProperties> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          size={Styles["message-card-icon-size"]}
          iconContent={IconContent["check-icon"]}
          color={Styles["success-font-color"]}
          strokeWidth={Styles["message-card-icon-thickness"]}
        />
      </View>
      <Text style={styles.content}>{text}</Text>
    </View>
  );
};

export default SuccessMessage;
