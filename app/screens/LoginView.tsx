import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useCameraPermissions } from "expo-camera";
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from "expo-screen-capture";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -hp("8%")}
    >
      <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <FormHeader />
            {!isKeyboardVisible && <Greeting text={t("hello-again")} />}
          </View>

          <View style={styles.textBoxContainer}>
            <View style={styles.textBoxes}>
              <TextBox
                iconName="person-icon"
                label="Uni-ID"
                onChangeText={setUniId}
                value={uniId}
                autoCapitalize="none"
              />
              <TextBox
                iconName="lock-icon"
                label={t("password")}
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
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    gap: hp("4%"),
  },
  textBoxContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textBoxes: {
    alignItems: "center",
    gap: hp("3%"),
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: wp("85%"),
  },
  errorContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: hp("1%"),
  },
});

export default LoginView;
