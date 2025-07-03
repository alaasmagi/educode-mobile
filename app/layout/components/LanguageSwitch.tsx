import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Icons } from "./Icons";
import i18next from "../../businesslogic/services/i18next";
import { SaveCurrentLanguage } from "../../businesslogic/services/UserDataOffline";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const LanguageSwitch = () => {
  const currentLang = i18next.language;

  const toggleLanguage = async () => {
    const newLang = currentLang === "et" ? "en" : "et";
    i18next.changeLanguage(newLang);
    await SaveCurrentLanguage(newLang);
  };

  return (
    <TouchableOpacity style={styles.structure} onPress={toggleLanguage}>
      <Image source={currentLang === "en" ? Icons["eng-flag"] : Icons["est-flag"]} style={styles.image} />
    </TouchableOpacity>
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
  },
  image: {
    height: hp("3%"),
    width: wp("9%"),
  },
});

export default LanguageSwitch;
