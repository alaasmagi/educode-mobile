import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from "./Icon";
import { IconContent } from "./Icons";

interface NormalMessageProperties {
  text: string | null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Styles["info-card-background-color"],
    padding: 10,
    width: "100%",
    borderRadius: Styles["message-card-border-radius"],
    borderColor: Styles["info-card-border-color"],
    borderWidth: Styles["message-card-border-thickness"],
  },
  icon: {
    width: "15%",
  },
 content: {
    width: "85%",
    fontWeight: "bold",
    textAlign: "center",
    color: Styles["info-font-color"],
    fontSize: Styles["message-card-font-size"],
  },
});

const NormalMessage: React.FC<NormalMessageProperties> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          size={Styles["message-card-icon-size"]}
          iconContent={IconContent["information-icon"]}
          color={Styles["info-font-color"]}
          strokeWidth={Styles["message-card-icon-thickness"]}
        />
      </View>
      <Text style={styles.content}>{text}</Text>
    </View>
  );
};

export default NormalMessage;
