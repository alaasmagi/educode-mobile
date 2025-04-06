import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";
import NavigationProps from "../../types";
import GlobalStyles from "../layout/styles/GlobalStyles";
import TextBox from "../layout/components/TextBox";
import NormalButton from "../layout/components/NormalButton";
import FormHeader from "../layout/headers/FormHeader";
import Greeting from "../layout/components/Greeting";
import NormalLink from "../layout/components/NormalLink";
import { RequestOTP, VerifyOTP, ChangeUserPassword } from "../businesslogic/services/UserDataOnline";
import ErrorMessage from "../layout/components/ErrorMessage";
import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import NormalMessage from "../layout/components/NormalMessage";
import UnderlineText from "../layout/components/UnderlineText";
import ChangePasswordModel from "../models/ChangePasswordModel";
import VerifyOTPModel from "../models/VerifyOTPModel";
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from "expo-screen-capture";
import { RegexFilters } from "../businesslogic/helpers/RegexFilters";

function ForgotPasswordView({ navigation, route }: NavigationProps) {
  const isNormalPassChange: boolean = route?.params?.isNormalPassChange ?? false;
  const [uniId, setUniId] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [normalMessage, setNormalMessage] = useState<string | null>(null);

  const { localData } = route.params ?? {};
  const { t } = useTranslation();
  const isKeyboardVisible = KeyboardVisibilityHandler();
  const [stepNr, setStepNr] = useState(1);

  useEffect(() => {
    preventScreenCaptureAsync();

    return () => {
      allowScreenCaptureAsync();
    };
  }, []);

  const isStudentIDFormValid = () => uniId !== "";
  useEffect(() => {
    if (!isStudentIDFormValid()) {
      setNormalMessage(t("all-fields-required-message"));
    } else {
      setNormalMessage("");
    }
  }, [uniId]);

  const isPasswordFormValid = () => password.length >= 8 && password === passwordAgain;
  useEffect(() => {
    if (password.length < 8 && password !== "") {
      setNormalMessage(t("password-length-message"));
    } else if (!isPasswordFormValid() && password !== "" && passwordAgain !== "") {
      setNormalMessage(t("password-match-message"));
    } else {
      setNormalMessage("");
    }
  }, [password, passwordAgain]);

  const handleOTPRequest = async () => {
    Keyboard.dismiss();

    const status = await RequestOTP(uniId);
    if (status === true) {
      setStepNr(2);
    } else {
      setErrorMessage(t(String(status)));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleOTPVerification = async () => {
    Keyboard.dismiss();
    const otpData: VerifyOTPModel = {
      uniId: uniId,
      otp: emailCode,
    };

    const status = await VerifyOTP(otpData);
    if (status === true) {
      setStepNr(3);
    } else {
      setErrorMessage(t(String(status)));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handlePasswordChange = async () => {
    Keyboard.dismiss();
    const model: ChangePasswordModel = {
      uniId: uniId,
      newPassword: password,
    };
    const status = await ChangeUserPassword(model);
    if (status === true) {
      const successMessage = t("password-changed");
      isNormalPassChange
        ? navigation.navigate("SettingsView", { localData, successMessage })
        : navigation.navigate("LoginView", { successMessage });
    } else {
      setErrorMessage(t(String(status)));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
        <View style={styles.headerContainer}>
          <FormHeader />
          {!isKeyboardVisible && <Greeting text={isNormalPassChange ? t("change-password") : t("forgot-password")} />}
        </View>
        {stepNr === 1 && (
          <>
            <View style={styles.textBoxContainer}>
              <UnderlineText text={t("verify-account")} />
              <View style={styles.textBoxes}>
                <TextBox
                  iconName="person-icon"
                  placeHolder="Uni-ID"
                  onChangeText={(text) => setUniId(text.trim())}
                  value={uniId}
                  autoCapitalize="none"
                />
              </View>
              {!isKeyboardVisible && errorMessage && (
                <View style={styles.errorContainer}>
                  <ErrorMessage text={errorMessage} />
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <NormalLink
                text={isNormalPassChange ? t("dont-change-password") : t("still-remember-password")}
                onPress={() =>
                  isNormalPassChange
                    ? navigation.navigate("SettingsView", { localData })
                    : navigation.navigate("LoginView")
                }
              />
              <NormalButton text={t("continue")} onPress={handleOTPRequest} disabled={uniId == ""} />
            </View>
          </>
        )}
        {stepNr === 2 && (
          <>
            <View style={styles.textBoxContainer}>
              <UnderlineText text={t("one-time-key-prompt") + ` ${uniId}@taltech.ee`} />
              <View style={styles.textBoxes}>
                <TextBox
                  iconName="pincode-icon"
                  placeHolder={t("one-time-key") + "*"}
                  onChangeText={(text) => setEmailCode(text.trim())}
                  value={emailCode}
                />
              </View>
              {!isKeyboardVisible && errorMessage && (
                <View style={styles.errorContainer}>
                  <ErrorMessage text={errorMessage} />
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <NormalButton
                text={t("continue")}
                onPress={handleOTPVerification}
                disabled={!RegexFilters.defaultId.test(emailCode)}
              />
              {!isKeyboardVisible && (
                <NormalLink
                  text={t("something-wrong-back")}
                  onPress={() => {
                    setStepNr(1);
                  }}
                />
              )}
            </View>
          </>
        )}
        {stepNr === 3 && (
          <>
            <View style={styles.textBoxContainer}>
              <UnderlineText text={t("set-new-password")}></UnderlineText>
              <View style={styles.textBoxes}>
                <TextBox
                  iconName="lock-icon"
                  placeHolder={t("password")}
                  isPassword
                  onChangeText={(text) => setPassword(text.trim())}
                  value={password}
                />
                <TextBox
                  iconName="lock-icon"
                  placeHolder={t("repeat-password")}
                  isPassword
                  onChangeText={(text) => setPasswordAgain(text.trim())}
                  value={passwordAgain}
                />
              </View>
              {!isKeyboardVisible && normalMessage && (
                <View style={styles.errorContainer}>
                  <NormalMessage text={normalMessage} />
                </View>
              )}
              {!isKeyboardVisible && errorMessage && (
                <View style={styles.errorContainer}>
                  <NormalMessage text={errorMessage} />
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <NormalButton text={t("continue")} onPress={handlePasswordChange} disabled={!isPasswordFormValid()} />
              {!isKeyboardVisible && (
                <NormalLink
                  text={t("something-wrong-back")}
                  onPress={() => {
                    setStepNr(2);
                  }}
                />
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2.2,
    gap: 70,
    justifyContent: "flex-end",
  },
  textBoxContainer: {
    flex: 2,
    justifyContent: "center",
    gap: 20,
  },
  data: {
    alignSelf: "center",
    width: "80%",
    borderWidth: 2,
    borderColor: "#BCBCBD",
    borderRadius: 20,
    gap: 25,
    padding: 10,
  },
  textBoxes: {
    gap: 25,
    alignItems: "center",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
  },
  errorContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ForgotPasswordView;
