import React from "react";
import { Text, StyleSheet } from "react-native";
import { Styles } from "../styles/Styles";

interface GreetingProperties {
  text: string;
}

const styles = StyleSheet.create({
  content: {
    fontWeight: "bold",
    textAlign: "center",
    color: Styles["greeting-font-color"],
    fontSize: Styles["greeting-font-size"],
    alignSelf: "center",
  },
});

const Greeting: React.FC<GreetingProperties> = ({ text }) => {
  return <Text style={styles.content}>{text}</Text>;
};

export default Greeting;
