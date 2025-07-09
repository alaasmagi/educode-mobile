import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface NormalButtonProperties {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  structure: {
    backgroundColor: "#262626",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1977E2",
    justifyContent: "center",
    alignItems: "center",
    width: wp("85%"),
    paddingHorizontal: wp("3.5%"),
    paddingVertical: hp("1.5%"),
    opacity: 1,
  },
  structureDisabled: {
    backgroundColor: "#262626",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1977E2",
    justifyContent: "center",
    alignItems: "center",
    width: wp("85%"),
    paddingHorizontal: wp("3.5%"),
    paddingVertical: hp("1.5%"),
    opacity: 0.5,
  },
  content: {
    color: "#E8EEF1",
    textAlign: "center",
    fontSize: wp("6%"),
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
