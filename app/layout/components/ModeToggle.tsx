import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Styles } from "../styles/Styles";

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
    backgroundColor: Styles["mode-toggle-background-color"],
    borderRadius: Styles["mode-toggle-border-radius"],
    padding: 2, //TODO: wp responsive
  },
  containerDisabled: {
    flexDirection: "row",
    backgroundColor: Styles["mode-toggle-background-color"],
    borderRadius: Styles["mode-toggle-border-radius"],
    padding: 2, //TODO: wp responsive
    opacity: 0.5,
  },
  option: {
    flex: 1,
    paddingVertical: hp("2%"),
    borderRadius: Styles["mode-toggle-option-border-radius"],
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: Styles["mode-toggle-selected-background-color"],
    borderWidth: Styles["mode-toggle-selected-border-thickness"],
    borderColor: Styles["mode-toggle-selected-border-color"],
  },
  text: {
    textAlign: "center",
    color: Styles["mode-toggle-font-color"],
    fontSize: Styles["mode-toggle-font-size"],
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
