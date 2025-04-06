import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface NormalLinkProperties {
  text: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  content: {
    color: "#BCBCBD",
    fontSize: 20,
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
