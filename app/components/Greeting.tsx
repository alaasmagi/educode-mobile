import React from "react";
import { Text, StyleSheet } from "react-native";

interface GreetingProperties {
  text: string;
}

const styles = StyleSheet.create({
  content: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#BCBCBD",
    fontSize: 40,
    alignSelf: "center",
  },
});

const Greeting: React.FC<GreetingProperties> = ({ text }) => {
  return <Text style={styles.content}>{text}</Text>;
};

export default Greeting;
