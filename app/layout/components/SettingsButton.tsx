import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { IconContent } from "./Icons";
import Icon from "./Icon";

interface SettingsButtonProperties {
  onPress: () => void;
}

const styles = StyleSheet.create({
  structure: {
    backgroundColor: "#262626",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1977E2",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
});

const SettingsButton: React.FC<SettingsButtonProperties> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.structure} onPress={onPress}>
      <Icon size={32} color="#E8EEF1" iconContent={IconContent["account-settings-icon"]} strokeWidth={2} />
    </TouchableOpacity>
  );
};

export default SettingsButton;
