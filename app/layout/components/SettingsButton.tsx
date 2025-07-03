import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Icons } from "./Icons";

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
      <Image source={Icons["account-settings-icon"]} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SettingsButton;
