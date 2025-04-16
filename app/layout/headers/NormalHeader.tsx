import React from "react";
import { Image, StyleSheet, View } from "react-native";
import LanguageSwitch from "../components/LanguageSwitch";
import SettingsButton from "../components/SettingsButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

function NormalHeader({ navigation, route }: NavigationProps) {
  const { localData } = route.params;
  return (
    <View style={styles.structure}>
      <Image style={styles.logo} resizeMode="contain" source={require("../../assets/logos/normal-logo.png")} />
      <View style={styles.buttonContainer}>
        <LanguageSwitch />
        <SettingsButton onPress={() => navigation.navigate("SettingsView", { localData })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: wp("55%"),
    height: hp("6%"),
    alignSelf: "center",
  },
  structure: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
  },
  buttonContainer: {
    flexDirection: "row",
    gap: wp("1.5%"),
  },
});

export default NormalHeader;
