import React from "react";
import { Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface GreetingProperties {
  text: string;
}

const styles = StyleSheet.create({
  content: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#E8EEF1",
    fontSize: wp("7.8%"),
    alignSelf: "center",
  },
});

const Greeting: React.FC<GreetingProperties> = ({ text }) => {
  return <Text style={styles.content}>{text}</Text>;
};

export default Greeting;
