import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    width: wp("10%"),
    height: hp("3.5%"),
    borderRadius: wp("3%"),
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4492EA",
  },
  number: {
    color: "#BCBCBD",
    fontSize: wp("4.5%"),
  },
  text: {
    fontSize: wp("4.5%"),
    color: "#BCBCBD",
  },
});

export default StepDivider;
