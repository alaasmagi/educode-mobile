import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Icons } from "./Icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    width: wp("85%"),
    gap: hp("0.5%"),
  },
  inputUnFocused: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("0.3%"),
    paddingHorizontal: wp("2%"),
    gap: wp("1%"),
    borderWidth: 1,
    borderColor: "#BCBCBD",
    borderRadius: wp("3%"),
  },
  label: {
    color: "#BCBCBD",
    fontSize: wp("4.5%"),
  },
  icon: {
    width: wp("7%"),
    height: wp("7%"),
    resizeMode: "contain",
  },
  input: {
    color: "#BCBCBD",
    fontSize: wp("5%"),
    flex: 1,
  },
  inputDisabled: {
    color: "#BCBCBD",
    fontSize: wp("5%"),
    flex: 1,
    opacity: 0.5,
  },
  inputFocused: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("1%"),
    paddingVertical: hp("0.3%"),
    paddingHorizontal: wp("2%"),
    borderWidth: 1,
    borderColor: "#4492EA",
    borderRadius: wp("3%"),
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
        <Image source={Icons[iconName]} style={styles.icon} />
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor="#BCBCBD"
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
            <Image style={styles.icon} source={isPasswordVisible ? Icons["visibility-on"] : Icons["visibility-off"]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextBox;
