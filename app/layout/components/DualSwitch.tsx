import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ApplyStyles } from "../../businesslogic/hooks/SelectAppTheme";
import { OverallUiStyles } from "../styles/Styles";

interface DualSwitchProperties {
  textLeft: string;
  textRight: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  isLeftSelected: boolean;
  isDisabled?: boolean;
}

const DualSwitch: React.FC<DualSwitchProperties> = ({
  textLeft,
  textRight,
  onPressLeft,
  onPressRight,
  isLeftSelected,
  isDisabled = false,
}) => {
  const { styles } = ApplyStyles();

  const sheet = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: styles["mode-toggle-bg-color"],
      borderRadius: styles["mode-toggle-border-radius"],
      padding: 2,
    },
    containerDisabled: {
      flexDirection: "row",
      backgroundColor: styles["mode-toggle-bg-color"],
      borderRadius: styles["mode-toggle-border-radius"],
      padding: 2,
      opacity: 0.5,
    },
    option: {
      flex: 1,
      paddingVertical: hp("2%"),
      borderRadius: styles["mode-toggle-option-border-radius"],
      alignItems: "center",
      justifyContent: "center",
    },
    selected: {
      backgroundColor: styles["mode-toggle-selected-bg-color"],
      borderWidth: styles["mode-toggle-selected-border-thickness"],
      borderColor: styles["mode-toggle-selected-border-color"],
    },
    text: {
      textAlign: "center",
      color: styles["mode-toggle-font-color"],
      fontSize: styles["mode-toggle-font-size"],
      fontFamily: OverallUiStyles["default-heading-font-family"]
    },
  });

  return (
    <View style={isDisabled ? sheet.containerDisabled : sheet.container}>
      <TouchableOpacity
        style={[sheet.option, isLeftSelected && sheet.selected]}
        disabled={isDisabled}
        onPress={() => onPressLeft()}
      >
        <Text style={sheet.text}>{textLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[sheet.option, !isLeftSelected && sheet.selected]}
        disabled={isDisabled}
        onPress={() => onPressRight()}
      >
        <Text style={sheet.text}>{textRight}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DualSwitch;
