import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

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
      <View style={[styles.checkbox]}>
        {isChecked && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4492EA",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 3,
    backgroundColor: "#4492EA",
  },
  label: {
    fontSize: 18,
    color: "#BCBCBD",
  },
});

export default Checkbox;
