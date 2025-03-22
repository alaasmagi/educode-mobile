import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import NavigationProps from "../../types";
import globalStyles from "../styles/GlobalStyles";
import TextBox from "../components/TextBox";
import NormalButton from "../components/NormalButton";
import FormHeader from "../layout/FormHeader";
import Greeting from "../components/Greeting";
import NormalLink from "../components/NormalLink";
import {
  CreateUserAccount,
  RequestOTP,
  VerifyOTP,
} from "../businesslogic/UserDataOnline";
import ErrorMessage from "../components/ErrorMessage";
import KeyboardVisibilityHandler from "../../hooks/KeyboardVisibilityHandler";
import NormalMessage from "../components/NormalMessage";
import DataText from "../components/DataText";
import UnderlineText from "../components/UnderlineText";
import CreateUserModel from "../models/CreateUserModel";
import {
  preventScreenCaptureAsync,
  allowScreenCaptureAsync,
} from "expo-screen-capture";
import { RegexFilters } from "../helpers/RegexFilters";
import VerifyOTPModel from "../models/VerifyOTPModel";

function CreateAccountView({ navigation }: NavigationProps) {
  const [uniId, setUniId] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [studentCode, setStudentCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [normalMessage, setNormalMessage] = useState<string | null>(null);

  const { t } = useTranslation();
  const isKeyboardVisible = KeyboardVisibilityHandler();
  const [stepNr, setStepNr] = useState(1);

  const isNameFormValid = () => firstName !== "" && lastName !== "";
  useEffect(() => {
    if (!isNameFormValid()) {
      setNormalMessage(t("all-fields-required-message"));
    } else {
      setNormalMessage("");
    }
  }, [firstName, lastName]);

  useEffect(() => {
    preventScreenCaptureAsync();

    return () => {
      allowScreenCaptureAsync();
    };
  }, []);

  const isStudentIDFormValid = () =>
    (uniId !== "" || RegexFilters.studentUniId.test(uniId)) &&
    (studentCode !== "" || RegexFilters.studentCode.test(studentCode));
  useEffect(() => {
    if (!isStudentIDFormValid()) {
      setNormalMessage(t("all-fields-required-message"));
    } else {
      setNormalMessage("");
    }
  }, [uniId, studentCode]);

  const handleOTPRequest = async () => {
    Keyboard.dismiss();

    if (await RequestOTP(uniId, firstName + lastName)) {
      setStepNr(3);
    } else {
      setErrorMessage(t("no-account-found"));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleOTPVerification = async () => {
    Keyboard.dismiss();
    const otpData: VerifyOTPModel = {
      uniId: uniId,
      otp: emailCode,
    };

    if (await VerifyOTP(otpData)) {
      setStepNr(4);
    } else {
      setErrorMessage(t("wrong-otp"));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const isPasswordFormValid = () =>
    password.length >= 8 && password === passwordAgain;
  useEffect(() => {
    if (password.length < 8 && password !== "") {
      setNormalMessage(t("password-length-message"));
    } else if (
      !isPasswordFormValid() &&
      password !== "" &&
      passwordAgain !== ""
    ) {
      setNormalMessage(t("password-match-message"));
    } else {
      setNormalMessage("");
    }
  }, [password, passwordAgain]);

  const handleRegister = async () => {
    Keyboard.dismiss();
    let userData: CreateUserModel = {
      uniId: uniId,
      studentCode: studentCode,
      fullName: firstName + " " + lastName,
      password: password,
    };

    if (await CreateUserAccount(userData)) {
      const successMessage = t("create-account-success");
      navigation.navigate("LoginView", { successMessage });
    } else {
      setErrorMessage(t("account-create-error"));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={globalStyles.anrdoidSafeArea}>
        <View style={styles.headerContainer}>
          <FormHeader />
          {!isKeyboardVisible && <Greeting text={t("welcome")} />}
        </View>
        {stepNr === 1 && (
          <>
            <View style={styles.textBoxContainer}>
              <View style={styles.textBoxes}>
                <TextBox
                  iconName="person-icon"
                  placeHolder={t("first-name")}
                  onChangeText={(text) => setFirstName(text.trim())}
                  value={firstName}
                />
                <TextBox
                  iconName="person-icon"
                  placeHolder={t("last-name")}
                  onChangeText={(text) => setLastName(text.trim())}
                  value={lastName}
                />
              </View>
              {!isKeyboardVisible && normalMessage && (
                <View style={styles.errorContainer}>
                  <NormalMessage text={normalMessage} />
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <NormalButton
                text={t("continue")}
                onPress={() => {
                  setStepNr(2);
                }}
                disabled={!isNameFormValid()}
              />
              <NormalLink
                text={t("already-registered")}
                onPress={() => navigation.navigate("LoginView")}
              />
            </View>
          </>
        )}
        {stepNr === 2 && (
          <>
            <View style={styles.textBoxContainer}>
              <View style={styles.textBoxes}>
                <TextBox
                  iconName="person-icon"
                  placeHolder="Uni-ID"
                  onChangeText={(text) => setUniId(text.trim())}
                  value={uniId}
                  autoCapitalize="none"
                />
                <TextBox
                  iconName="person-icon"
                  placeHolder={t("student-code")}
                  onChangeText={(text) => setStudentCode(text.trim())}
                  value={studentCode}
                  autoCapitalize="characters"
                />
              </View>
              {!isKeyboardVisible && normalMessage && (
                <View style={styles.errorContainer}>
                  <NormalMessage text={normalMessage} />
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <NormalLink
                text={t("something-wrong-back")}
                onPress={() => {
                  setStepNr(1);
                }}
              />
              <NormalButton
                text={t("continue")}
                onPress={() => {
                  handleOTPRequest();
                  setStepNr(3);
                }}
                disabled={
                  !RegexFilters.studentUniId.test(uniId) ||
                  !RegexFilters.studentCode.test(studentCode)
                }
              />
              <NormalLink
                text={t("already-registered")}
                onPress={() => navigation.navigate("LoginView")}
              />
            </View>
          </>
        )}
        {stepNr === 3 && (
          <>
            <View style={styles.textBoxContainer}>
              <UnderlineText
                text={t("one-time-key-prompt") + ` ${uniId}@taltech.ee`}
              />
              <View style={styles.textBoxes}>
                <TextBox
                  iconName="pincode-icon"
                  placeHolder={t("one-time-key")}
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
                    setStepNr(2);
                  }}
                />
              )}
            </View>
          </>
        )}
        {stepNr === 4 && (
          <>
            <View style={styles.textBoxContainer}>
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
            </View>
            <View style={styles.buttonContainer}>
              <NormalLink
                text={t("something-wrong-back")}
                onPress={() => {
                  setStepNr(3);
                }}
              />
              <NormalButton
                text={t("continue")}
                onPress={() => {
                  setStepNr(5);
                }}
                disabled={!isPasswordFormValid()}
              />
              <NormalLink
                text={t("already-registered")}
                onPress={() => navigation.navigate("LoginView")}
              />
            </View>
          </>
        )}
        {stepNr === 5 && (
          <>
            <View style={styles.textBoxContainer}>
              <UnderlineText text="Verify your details:" />
              <View style={styles.data}>
                <DataText
                  iconName="person-icon"
                  text={firstName + " " + lastName}
                />
                <DataText iconName="person-icon" text={uniId} />
                <DataText iconName="person-icon" text={studentCode} />
              </View>
              {!isKeyboardVisible && errorMessage && (
                <View style={styles.errorContainer}>
                  <ErrorMessage text={errorMessage} />
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <NormalLink
                text={t("something-wrong-back")}
                onPress={() => {
                  setStepNr(4);
                }}
              />
              <NormalButton
                text={t("create-account")}
                onPress={handleRegister}
              />
              <NormalLink
                text={t("already-registered")}
                onPress={() => navigation.navigate("LoginView")}
              />
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
    gap: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateAccountView;
