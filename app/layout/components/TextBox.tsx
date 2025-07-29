import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IconContent } from "./Icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "./Icon";
import { Styles } from "../styles/Styles";

interface TextBoxProperties {
  iconName: string;
  label: string;
  placeHolder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  editable?: boolean;
}

const styles = StyleSheet.create({
  textBoxContainer: {
    alignSelf: "center",
    width: wp("85%"),
  },
  inputUnFocused: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("0.1%"),
    paddingHorizontal: wp("2%"),
    gap: wp("1%"),
    borderWidth: Styles["textbox-border-thickness"],
    borderColor: Styles["textbox-border-color"],
    borderRadius: Styles["textbox-border-radius"],
  },
  label: {
    color: Styles["textbox-font-color"],
    fontSize: Styles["textbox-font-size"],
  },
  input: {
    color: Styles["textbox-font-color"],
    fontSize: Styles["textbox-font-size"],
    flex: 1,
  },
  inputDisabled: {
    color: Styles["textbox-font-color"],
    fontSize: Styles["textbox-font-size"],
    flex: 1,
    opacity: 0.5,
  },
  inputFocused: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("1%"),
    paddingVertical: hp("0.1%"),
    paddingHorizontal: wp("2%"),
    borderWidth: Styles["textbox-border-thickness"],
    borderColor: Styles["textbox-active-border-color"],
    borderRadius: Styles["textbox-border-radius"],
  },
});

const TextBox: React.FC<TextBoxProperties> = ({
  iconName,
  label,
  placeHolder,
  value,
  onChangeText,
  isPassword,
  autoCapitalize = "sentences",
  editable = true,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View style={styles.textBoxContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={isFocused ? styles.inputFocused : styles.inputUnFocused}>
        <Icon
          size={Styles["textbox-icon-size"]}
          color={Styles["textbox-icon-color"]}
          iconContent={IconContent[iconName]}
          strokeWidth={Styles["textbox-icon-thickness"]}
        />
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={Styles["textbox-placeholder-color"]}
          style={editable == false ? styles.inputDisabled : styles.input}
          scrollEnabled={true}
          numberOfLines={1}
          secureTextEntry={isPassword && !isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)}>
            <Icon
              size={Styles["textbox-icon-size"]}
              color={Styles["textbox-icon-color"]}
              iconContent={isPasswordVisible ? IconContent["visibility-on"] : IconContent["visibility-off"]}
              strokeWidth={Styles["textbox-icon-thickness"]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextBox;
