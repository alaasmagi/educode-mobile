import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Styles } from "../styles/Styles";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
      <View style={[styles.checkbox]}>{isChecked && <View style={styles.innerCircle} />}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  checkbox: {
    width: Styles["checkbox-size"],
    height: Styles["checkbox-size"],
    borderRadius: Styles["checkbox-border-radius"],
    borderWidth: Styles["checkbox-border-thickness"],
    borderColor: Styles["checkbox-border-color"],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Styles["checkbox-background-color"],
  },
  innerCircle: {
    width: Styles["checkbox-inner-size"],
    height: Styles["checkbox-inner-size"],
    borderRadius: Styles["checkbox-inner-radius"],
    backgroundColor: Styles["checkbox-inner-background-color"],
  },
  label: {
    fontSize: Styles["checkbox-font-size"],
    color: Styles["checkbox-label-color"],
  },
});

export default Checkbox;
