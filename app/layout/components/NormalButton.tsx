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
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4492EA",
    justifyContent: "center",
    alignItems: "center",
    width: wp("85%"),
    paddingHorizontal: wp("3.5%"),
    paddingVertical: hp("1.5%"),
    opacity: 1,
  },
  structureDisabled: {
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4492EA",
    justifyContent: "center",
    alignItems: "center",
    width: wp("85%"),
    paddingHorizontal: wp("3.5%"),
    paddingVertical: hp("1.5%"),
    opacity: 0.5,
  },
  content: {
    color: "#BCBCBD",
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
