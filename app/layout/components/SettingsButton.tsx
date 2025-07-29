import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { IconContent } from "./Icons";
import Icon from "./Icon";
import { Styles } from "../styles/Styles";

interface SettingsButtonProperties {
  onPress: () => void;
}

const styles = StyleSheet.create({
  structure: {
    backgroundColor: Styles["settings-button-bg-color"],
    borderRadius: Styles["settings-button-border-radius"],
    borderWidth: Styles["settings-button-border-thickness"],
    borderColor: Styles["settings-button-border-color"],
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

const SettingsButton: React.FC<SettingsButtonProperties> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.structure} onPress={onPress}>
      <Icon
        size={Styles["settings-button-icon-size"]}
        color={Styles["settings-button-icon-color"]}
        iconContent={IconContent["account-settings-icon"]}
        strokeWidth={Styles["settings-button-icon-thickness"]}
      />
    </TouchableOpacity>
  );
};

export default SettingsButton;
