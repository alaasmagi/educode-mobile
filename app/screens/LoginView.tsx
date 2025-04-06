import React, { useState, useEffect, useCallback } from "react";
import { Alert, SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";
import { useCameraPermissions } from "expo-camera";
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from "expo-screen-capture";

import NavigationProps from "../../types";
import GlobalStyles from "../layout/styles/GlobalStyles";

import FormHeader from "../layout/headers/FormHeader";
import Greeting from "../layout/components/Greeting";
import TextBox from "../layout/components/TextBox";
import NormalButton from "../layout/components/NormalButton";
import NormalLink from "../layout/components/NormalLink";
import ErrorMessage from "../layout/components/ErrorMessage";
import SuccessMessage from "../layout/components/SuccessMessage";

import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import { UserLogin, FetchAndSaveUserDataByUniId } from "../businesslogic/services/UserDataOnline";
import { GetOfflineUserData } from "../businesslogic/services/UserDataOffline";

function LoginView({ navigation, route }: NavigationProps) {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [uniId, setUniId] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(route?.params?.successMessage || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isKeyboardVisible = KeyboardVisibilityHandler();

  const isFormValid = uniId.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    preventScreenCaptureAsync();
    const timeout = setTimeout(() => setSuccessMessage(null), 3000);
    return () => {
      clearTimeout(timeout);
      allowScreenCaptureAsync();
    };
  }, []);

  const showTemporaryMessage = (type: "error" | "success", message: string) => {
    type === "error" ? setErrorMessage(message) : setSuccessMessage(message);
    setTimeout(() => {
      type === "error" ? setErrorMessage(null) : setSuccessMessage(null);
    }, 3000);
  };

  const checkPermissions = async (): Promise<boolean> => {
    if (permission?.granted) return true;
    const response = await requestPermission();
    if (!response.granted) {
      Alert.alert(t("camera-permission-denied"), t("camera-permission-denied-message"));
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!(await checkPermissions())) return;

    const loginStatus = await UserLogin(uniId.trim(), password.trim());

    if (loginStatus === true) {
      const fetchDataStatus = await FetchAndSaveUserDataByUniId(uniId.trim());

      if (fetchDataStatus === true) {
        const localData = await GetOfflineUserData();
        if (localData) {
          const nextView = localData.userType === "Teacher" ? "TeacherMainView" : "StudentMainView";
          navigation.navigate(nextView, { localData });
        }
      } else {
        showTemporaryMessage("error", t(String(fetchDataStatus)));
      }
    } else {
      showTemporaryMessage("error", t(String(loginStatus)));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
        <View style={styles.headerContainer}>
          <FormHeader />
          {!isKeyboardVisible && <Greeting text={t("hello-again")} />}
        </View>

        <View style={styles.textBoxContainer}>
          <View style={styles.textBoxes}>
            <TextBox
              iconName="person-icon"
              placeHolder="Uni-ID"
              onChangeText={setUniId}
              value={uniId}
              autoCapitalize="none"
            />
            <TextBox
              iconName="lock-icon"
              placeHolder={t("password")}
              isPassword
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View style={styles.forgotPasswordContainer}>
            <NormalLink text={t("forgot-password")} onPress={() => navigation.navigate("ForgotPasswordView")} />
          </View>

          <View style={styles.errorContainer}>
            {!isKeyboardVisible && errorMessage && <ErrorMessage text={errorMessage} />}
            {!isKeyboardVisible && successMessage && <SuccessMessage text={successMessage} />}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <NormalButton text={t("log-in")} onPress={handleLogin} disabled={!isFormValid} />
          <NormalLink text={t("register-now")} onPress={() => navigation.navigate("CreateAccountView")} />
        </View>
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
    gap: 3,
  },
});

export default LoginView;
