import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StepDividerProps {
  stepNumber: number;
  text: string;
}

const StepDivider: React.FC<StepDividerProps> = ({ stepNumber, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.number}>{stepNumber}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "center"
  },
  circle: {
    width: 50,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4492EA",
  },
  number: {
    color: "#BCBCBD",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
    color: "#BCBCBD",
  },
});

export default StepDivider;
