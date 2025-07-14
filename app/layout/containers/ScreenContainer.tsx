import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

type ScreenContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  scroll?: boolean;
  dismissKeyboardOnPress?: boolean;
  keyboardVerticalOffsetIOS?: number;
  keyboardVerticalOffsetAndroid?: number;
  safeAreaStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  header,
  dismissKeyboardOnPress = false,
  scroll = false,
  keyboardVerticalOffsetIOS = 100,
  keyboardVerticalOffsetAndroid = -hp("9%"),
  safeAreaStyle = GlobalStyles.anrdoidSafeArea,
}) => {
  const ContainerView = scroll ? ScrollView : View;
  const containerProps = scroll ? { keyboardShouldPersistTaps: "handled" as const } : {};

  const Inner = (
    <KeyboardAvoidingView
      style={styles.structure}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? keyboardVerticalOffsetIOS : keyboardVerticalOffsetAndroid}
    >
      <SafeAreaView style={safeAreaStyle}>
        {header ? <View style={styles.header}>{header}</View> : null}
        <ContainerView {...containerProps}>{children}</ContainerView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
  if (dismissKeyboardOnPress) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {Inner}
      </TouchableWithoutFeedback>
    );
  }
  return Inner;
};

const styles = StyleSheet.create({
  header: {
    marginVertical: hp("5%"),
  },
  structure: {
    flex: 1,
  }
});
