import React from "react";
import { Image, StyleSheet, View } from "react-native";
import LanguageSwitch from "../components/LanguageSwitch";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const FormHeader = () => {
  return (
    <View style={styles.structure}>
      <Image style={styles.logo} resizeMode="contain" source={require("../../assets/logos/normal-logo.png")} />
      <LanguageSwitch />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: wp("70%"),
    height: hp("7%"),
  },
  structure: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
  },
});

export default FormHeader;
