import React, { useState, useEffect, useCallback } from "react";
import NavigationProps from "../../types";
import { SafeAreaView, StyleSheet, View, Alert, BackHandler, Keyboard } from "react-native";
import { useTranslation } from "react-i18next";
import GlobalStyles from "../layout/styles/GlobalStyles";

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

function SettingsView({ navigation, route }: NavigationProps) {
  const { t } = useTranslation();
  const { localData } = route.params;
  const message = route?.params?.successMessage ?? null;
  const [isOfflineOnly, setIsOfflineOnly] = useState(false);
  const [confirmationText, setConfirmationText] = useState<string | null>(null);
  const [newStudentCode, setNewStudentCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isKeyboardVisible = KeyboardVisibilityHandler();

  useEffect(() => {
    if (!localData.uniId) {
      setIsOfflineOnly(true);
    }
    if (message) {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), 3000);
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
    const status = await DeleteUser(localData.uniId);
    if (status === true) {
      await DeleteCurrentLanguage();
      await DeleteOfflineUserData();
      navigation.navigate("InitialSelectionView");
    } else {
      setErrorMessage(t(String(status)));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleLogout = async () => {
    await DeleteOfflineUserData();
    navigation.navigate("InitialSelectionView");
  };

  const handleStudentCodeChange = async () => {
    Keyboard.dismiss();
    localData.studentCode = newStudentCode;
    await SaveOfflineUserData(localData);
    setNewStudentCode("");
    setSuccessMessage(t("studentcode-change-success"));
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  BackButtonHandler(navigation);

  return (
    <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
      <View style={styles.headerContainer}>
        <NormalHeader navigation={navigation} route={route} />
      </View>

      {!isOfflineOnly && (
        <View style={styles.firstOptionContainer}>
          {!isKeyboardVisible && (
            <NormalButton
              text={t("change-password")}
              onPress={() => navigation.navigate("ForgotPasswordView", { isNormalPassChange: true, localData })}
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
            onChangeText={setNewStudentCode}
            placeHolder={t("student-code")}
            autoCapitalize="characters"
          />
          <NormalButton
            text={t("save-account-changes")}
            onPress={handleStudentCodeChange}
            disabled={!isStudentCodeValid()}
          />
        </View>
      ) : (
        <View style={styles.deleteAccount}>
          <SeparatorLine text={t("delete-account")} />
          <TextBox
            iconName="person-icon"
            value={confirmationText ?? ""}
            onChangeText={setConfirmationText}
            placeHolder={t("type-delete") + " *"}
          />
          <NormalButton text={t("delete-account")} disabled={confirmationText !== "DELETE"} onPress={handleDelete} />
        </View>
      )}

      <View style={styles.lowButtonContainer}>
        {!isKeyboardVisible && <NormalButton text={t("back-to-home")} onPress={handleBackToHome} />}
        {!isKeyboardVisible && (
          <NormalLink text={!isOfflineOnly ? t("log-out") : t("delete-account")} onPress={handleLogout} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  firstOptionContainer: {
    flex: 1.5,
    width: "100%",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
  },
  deleteAccount: {
    flex: 1.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  lowButtonContainer: {
    flex: 1.5,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsView;
