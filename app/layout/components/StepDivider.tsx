import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Styles } from "../styles/Styles";

interface StepDividerProps {
  stepNumber: number;
  label: string;
}

const StepDivider: React.FC<StepDividerProps> = ({ stepNumber, label }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.number}>{stepNumber}</Text>
      </View>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("90%"),
    gap: wp("3%"),
  },
  circle: {
    width: Styles["step-divider-circle-width"],
    height: Styles["step-divider-circle-height"],
    borderRadius: Styles["step-divider-border-radius"],
    backgroundColor: Styles["step-divider-bg-color"],
    justifyContent: "center",
    alignItems: "center",
    borderWidth: Styles["step-divider-border-thickness"],
    borderColor: Styles["step-divider-border-color"],
  },
  number: {
    color: Styles["step-divider-font-color"],
    fontSize: Styles["step-divider-font-size"],
  },
  text: {
    fontSize: Styles["step-divider-font-size"],
    color: Styles["step-divider-font-color"],
  },
});

export default StepDivider;
