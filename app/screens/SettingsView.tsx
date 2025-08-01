import React, { useState, useEffect, useCallback } from "react";
import NavigationProps from "../../types";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import SeparatorLine from "../layout/components/SeparatorLine";
import TextBox from "../layout/components/TextBox";
import NormalButton from "../layout/components/NormalButton";
import NormalLink from "../layout/components/NormalLink";
import ErrorMessage from "../layout/components/ErrorMessage";
import SuccessMessage from "../layout/components/SuccessMessage";
import {
  DeleteCurrentLanguage,
  DeleteOfflineUserData,
  SaveOfflineUserData,
} from "../businesslogic/services/UserDataOffline";
import { DeleteUser } from "../businesslogic/services/UserDataOnline";
import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import BackButtonHandler from "../businesslogic/hooks/BackButtonHandler";
import NormalHeader from "../layout/headers/NormalHeader";
import { RegexFilters } from "../businesslogic/helpers/RegexFilters";
import { useFocusEffect } from "@react-navigation/native";
import { ApplyStyles } from "../businesslogic/hooks/SelectAppTheme";
import { GetNativeSafeArea } from "../layout/styles/NativeStyles";

function SettingsView({ navigation, route }: NavigationProps) {
  const { t } = useTranslation();
  const { localData } = route.params;
  const message = route?.params?.successMessage ?? null;
  const [isOfflineOnly, setIsOfflineOnly] = useState(false);
  const [confirmationText, setConfirmationText] = useState<string | null>(null);
  const [newStudentCode, setNewStudentCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const isKeyboardVisible = KeyboardVisibilityHandler();

  // THEME
  const { theme } = ApplyStyles();
  const safeAreaStyle = GetNativeSafeArea(theme);

  useEffect(() => {
    if (!localData.uniId) {
      setIsOfflineOnly(true);
    }
    if (message) {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), 2000);
    }
  }, [localData.uniId, message]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(t("exit-app"), t("exit-app-prompt"), [
          { text: t("cancel"), onPress: () => null, style: "cancel" },
          { text: t("yes"), onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }, [])
  );

  const handleBackToHome = () => {
    navigation.navigate(localData.userType === "Student" ? "StudentMainView" : "TeacherMainView", { localData });
  };
  const isStudentCodeValid = () => RegexFilters.studentCode.test(newStudentCode);

  const handleDelete = async () => {
    Keyboard.dismiss();
    setIsButtonDisabled(true);
    const status = await DeleteUser(localData.uniId);
    setIsButtonDisabled(false);
    if (status === true) {
      await DeleteCurrentLanguage();
      await DeleteOfflineUserData();
      navigation.navigate("InitialSelectionView");
    } else {
      setErrorMessage(t(String(status)));
      setTimeout(() => setErrorMessage(null), 2000);
    }
  };

  const handleLogout = async () => {
    setIsButtonDisabled(true);
    await DeleteOfflineUserData();
    setIsButtonDisabled(false);
    navigation.navigate("InitialSelectionView");
  };

  const handleStudentCodeChange = async () => {
    Keyboard.dismiss();
    setIsButtonDisabled(true);
    localData.studentCode = newStudentCode.toUpperCase();
    await SaveOfflineUserData(localData);
    setIsButtonDisabled(false);
    setNewStudentCode("");
    setSuccessMessage(t("studentcode-change-success"));
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  BackButtonHandler(navigation);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -hp("9%")}
    >
      <SafeAreaView style={safeAreaStyle}>
        <View style={styles.headerContainer}>
          <NormalHeader navigation={navigation} route={route} />
        </View>
        {!isOfflineOnly && (
          <View style={styles.firstOptionContainer}>
            {!isKeyboardVisible && (
              <NormalButton
                text={t("change-password")}
                onPress={() => navigation.navigate("ForgotPasswordView", { isNormalPassChange: true, localData })}
                disabled={isButtonDisabled}
              />
            )}
          </View>
        )}
        <View style={styles.messageContainer}>
          {errorMessage && <ErrorMessage text={errorMessage} />}
          {successMessage && <SuccessMessage text={successMessage} />}
        </View>
        {isOfflineOnly ? (
          <View style={styles.firstOptionContainer}>
            <SeparatorLine text={t("offline-mode-settings")} />
            <TextBox
              iconName="person-icon"
              value={newStudentCode}
              onChangeText={(text) => setNewStudentCode(text.trim())}
              label={t("student-code")}
              autoCapitalize="characters"
            />
            <NormalButton
              text={t("save-account-changes")}
              onPress={handleStudentCodeChange}
              disabled={!isStudentCodeValid() || isButtonDisabled}
            />
          </View>
        ) : (
          <View style={styles.deleteAccount}>
            <SeparatorLine text={t("delete-account")} />
            <TextBox
              iconName="passcode-icon"
              value={confirmationText ?? ""}
              onChangeText={setConfirmationText}
              label={t("confirmation")}
              placeHolder={t("type-delete")}
            />
            <NormalButton
              text={t("delete-account")}
              disabled={confirmationText !== "DELETE" || isButtonDisabled}
              onPress={handleDelete}
            />
          </View>
        )}
        <View style={styles.lowButtonContainer}>
          {!isKeyboardVisible && (
            <NormalButton text={t("back-to-home")} onPress={handleBackToHome} disabled={isButtonDisabled} />
          )}
          {!isKeyboardVisible && (
            <NormalLink text={!isOfflineOnly ? t("log-out") : t("delete-my-data")} onPress={handleLogout} />
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  firstOptionContainer: {
    flex: 1.5,
    width: wp("90%"),
    gap: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
  },
  deleteAccount: {
    flex: 1.5,
    width: wp("90%"),
    justifyContent: "center",
    alignItems: "center",
    gap: hp("2%"),
  },
  lowButtonContainer: {
    flex: 1.5,
    gap: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsView;