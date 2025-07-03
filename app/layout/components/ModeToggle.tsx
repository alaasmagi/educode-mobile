import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface ModeToggleProperties {
  textLeft: string;
  textRight: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  isLeftSelected: boolean;
  isDisabled?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#525252",
    borderRadius: 20,
    padding: 2,
  },
  containerDisabled: {
    flexDirection: "row",
    backgroundColor: "#525252",
    borderRadius: 20,
    padding: 2,
    opacity: 0.5,
  },
  option: {
    flex: 1,
    paddingVertical: hp("2%"),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#262626",
    borderWidth: 2,
    borderColor: "#1977E2",
  },
  text: {
    color: "#E8EEF1",
    fontSize: wp("6%"),
    fontWeight: "bold",
  },
});

const ModeToggle: React.FC<ModeToggleProperties> = ({
  textLeft,
  textRight,
  onPressLeft,
  onPressRight,
  isLeftSelected,
  isDisabled = false,
}) => {

  return (
    <View style={isDisabled ? styles.containerDisabled : styles.container}>
      <TouchableOpacity
        style={[styles.option, isLeftSelected && styles.selected]}
        disabled={isDisabled}
        onPress={() => onPressLeft()}
      >
        <Text style={styles.text}>{textLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, !isLeftSelected && styles.selected]}
        disabled={isDisabled}
        onPress={() => onPressRight()}
      >
        <Text style={styles.text}>{textRight}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModeToggle;
