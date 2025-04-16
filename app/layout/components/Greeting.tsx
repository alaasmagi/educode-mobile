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
    color: "#BCBCBD",
    fontSize: wp("10%"),
    alignSelf: "center",
  },
});

const Greeting: React.FC<GreetingProperties> = ({ text }) => {
  return <Text style={styles.content}>{text}</Text>;
};

export default Greeting;
