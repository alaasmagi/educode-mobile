import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Styles } from "../styles/Styles";

interface NormalButtonProperties {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  structure: {
    backgroundColor: Styles["normal-button-bg-color"],
    borderRadius: Styles["normal-button-border-radius"],
    borderWidth: Styles["normal-border-thickness"],
    borderColor: Styles["normal-button-border-color"],
    justifyContent: "center",
    alignItems: "center",
    width: wp("85%"),
    paddingHorizontal: wp("3.5%"),
    paddingVertical: hp("1.5%"),
    opacity: 1,
  },
  structureDisabled: {
    backgroundColor: Styles["normal-button-bg-color"],
    borderRadius: Styles["normal-button-border-radius"],
    borderWidth: Styles["normal-border-thickness"],
    borderColor: Styles["normal-button-border-color"],
    justifyContent: "center",
    alignItems: "center",
    width: wp("85%"),
    paddingHorizontal: wp("3.5%"),
    paddingVertical: hp("1.5%"),
    opacity: 0.5,
  },
  content: {
    color: Styles["normal-font-color"],
    textAlign: "center",
    fontSize: Styles["normal-button-font-size"],
    fontWeight: "bold",
  },
});

const NormalButton: React.FC<NormalButtonProperties> = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={disabled ? styles.structureDisabled : styles.structure}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.content}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NormalButton;
