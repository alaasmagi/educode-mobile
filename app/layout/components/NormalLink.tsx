import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface NormalLinkProperties {
  text: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  content: {
    color: "#E8EEF1",
    fontSize: wp("4.5%"),
    textDecorationLine: "underline",
  },
});

const NormalLink: React.FC<NormalLinkProperties> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.content}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NormalLink;
