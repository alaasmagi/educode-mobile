import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from "react-native";
import { Icons } from "./Icons";
import i18next from "../../businesslogic/services/i18next";
import { SaveCurrentLanguage } from "../../businesslogic/services/UserDataOffline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const languages = [
  { code: "et", icon: Icons["est-flag"] },
  { code: "en", icon: Icons["eng-flag"] },
  { code: "fi", icon: Icons["fin-flag"] },
  { code: "ge", icon: Icons["ger-flag"] },
  { code: "uk", icon: Icons["ukr-flag"] },
  { code: "ru", icon: Icons["rus-flag"] },
];

const LanguageSwitch = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number>(100);
  const currentLang = i18next.language;

  const buttonRef = useRef<View>(null);

  const onSelectLanguage = async (langCode: string) => {
    setShowDropdown(false);
    if (langCode !== currentLang) {
      i18next.changeLanguage(langCode);
      await SaveCurrentLanguage(langCode);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.structure}
        ref={buttonRef}
        activeOpacity={0.8}
        onPress={() => setShowDropdown(!showDropdown)}
        onLayout={(event: LayoutChangeEvent) => {
          setButtonWidth(event.nativeEvent.layout.width);
        }}
      >
        <Image
          source={languages.find((l) => l.code === currentLang)?.icon}
          style={styles.image}
        />
      </TouchableOpacity>

      {showDropdown && (
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.backdrop}>
            <View style={[styles.dropdown, { width: buttonWidth }]}>
              <FlatList
                data={languages.filter((l) => l.code !== currentLang)}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    disabled={item.code === currentLang}
                    style={[styles.dropdownItem]}
                    onPress={() => onSelectLanguage(item.code)}
                  >
                    <Image source={item.icon} style={styles.image} />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  structure: {
    backgroundColor: "#262626",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1977E2",
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: hp("4.5%"),
    width: wp("9%"),
    resizeMode: "contain",
  },
  backdrop: {
    zIndex: 1,
  },
  dropdown: {
    backgroundColor: "#232a2e",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1977E2",
    alignSelf: "center",
    overflow: "hidden",
    position: "absolute",
  },
  dropdownItem: {
    paddingVertical: hp("0.5%"),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  imageDropdown: {
    height: hp("2.7%"),
    width: wp("8%"),
    resizeMode: "contain",
  },
});

export default LanguageSwitch;
