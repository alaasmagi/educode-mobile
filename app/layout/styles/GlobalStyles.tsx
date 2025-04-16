import { StyleSheet, Platform, StatusBar } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default StyleSheet.create({
  anrdoidSafeArea: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: hp("2.5%"),
    paddingHorizontal: wp("5%"),
  },
});
