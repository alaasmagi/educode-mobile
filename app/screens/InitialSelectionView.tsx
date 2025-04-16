import React, { useEffect, useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import * as SplashScreen from "expo-splash-screen";
import { useTranslation } from "react-i18next";
import i18next from "../businesslogic/services/i18next";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import GlobalStyles from "../layout/styles/GlobalStyles";
import NormalButton from "../layout/components/NormalButton";
import SeparatorLine from "../layout/components/SeparatorLine";
import TextBox from "../layout/components/TextBox";
import NormalMessage from "../layout/components/NormalMessage";

import NavigationProps from "../../types";
import FormHeader from "../layout/headers/FormHeader";
import BackButtonHandler from "../businesslogic/hooks/BackButtonHandler";
import LocalUserData from "../models/LocalUserDataModel";
import { GetCurrentLanguage, GetOfflineUserData, SaveOfflineUserData } from "../businesslogic/services/UserDataOffline";
import { FetchAndSaveUserDataByUniId, TestConnection } from "../businesslogic/services/UserDataOnline";
import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import { RegexFilters } from "../businesslogic/helpers/RegexFilters";
import NormalLink from "../layout/components/NormalLink";

function InitialSelectionView({ navigation }: NavigationProps) {
  const { t } = useTranslation();
  const [stepNr, setStepNr] = useState<number>(1);
  const [studentCode, setStudentCode] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [normalMessage, setNormalMessage] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const isKeyboardVisible = KeyboardVisibilityHandler();

  BackButtonHandler(navigation);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(t("exit-app"), t("exit-app-prompt"), [
          { text: t("cancel"), style: "cancel" },
          { text: t("yes"), onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    const init = async () => {
      await SplashScreen.preventAutoHideAsync();

      const connection = await TestConnection();
      if (!connection) {
        return Alert.alert(t("connection-error"), t("connection-error-prompt"), [
          { text: t("exit-app"), onPress: () => BackHandler.exitApp(), style: "cancel" },
          { text: t("reload"), onPress: init },
        ]);
      }

      const lang = await GetCurrentLanguage();
      if (lang) i18next.changeLanguage(lang);

      let localData = await GetOfflineUserData();

      if (localData?.offlineOnly) {
        navigation.navigate("StudentMainView", { localData });
      } else if (localData?.uniId) {
        const loginSuccess = await FetchAndSaveUserDataByUniId(localData.uniId);
        if (loginSuccess) {
          localData = await GetOfflineUserData();
          const target = localData?.userType === "Teacher" ? "TeacherMainView" : "StudentMainView";
          navigation.navigate(target, { localData });
        } else {
          setNormalMessage(t("login-again"));
          setTimeout(() => setNormalMessage(null), 3000);
        }
      }

      await SplashScreen.hideAsync();
    };

    init();
  }, []);

  const handleOfflineLogin = async () => {
    Keyboard.dismiss();

    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert(t("camera-permission-denied"), t("camera-permission-denied-message"));
      }
    }

    const localData: LocalUserData = {
      userType: "Student",
      studentCode: String(studentCode),
      fullName: `${firstName} ${lastName}`,
      offlineOnly: true,
    };

    await SaveOfflineUserData(localData);
    navigation.navigate("StudentMainView", { localData });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -hp("8%")}
    >
      <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
        <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <FormHeader />
          </View>
          {stepNr == 1 && (
            <View style={styles.mainContainer}>
              {!isKeyboardVisible && (
                <View style={styles.mainLoginContainer}>
                  <NormalButton text={t("log-in")} onPress={() => navigation.navigate("LoginView")} />
                  <NormalButton
                    text={t("register-as-student")}
                    onPress={() => navigation.navigate("CreateAccountView")}
                  />
                  {normalMessage && <NormalMessage text={normalMessage} />}
                </View>
              )}
              <View style={styles.alternateLoginContainer}>
                <SeparatorLine text={t("or-use-offline-only")} />
                <TextBox
                  iconName="person-icon"
                  label={t("student-code")}
                  onChangeText={(text) => setStudentCode(text.trim())}
                  value={studentCode ?? ""}
                  autoCapitalize="characters"
                />
                <NormalButton
                  text={t("continue")}
                  onPress={() => setStepNr(2)}
                  disabled={!RegexFilters.studentCode.test(String(studentCode))}
                />
              </View>
            </View>
          )}
          {stepNr == 2 && (
            <View style={styles.mainContainer}>
              <View style={styles.alternateLoginContainer}>
                <TextBox
                  iconName="person-icon"
                  label={t("first-name")}
                  onChangeText={(text) => setFirstName(text.trim())}
                  value={firstName ?? ""}
                  autoCapitalize="sentences"
                />
                <TextBox
                  iconName="person-icon"
                  label={t("last-name")}
                  onChangeText={(text) => setLastName(text.trim())}
                  value={lastName ?? ""}
                  autoCapitalize="sentences"
                />
                <View style={styles.buttonContainer}>
                  <NormalLink text={t("something-wrong-back")} onPress={() => setStepNr(1)} />
                  <NormalButton
                    text={t("continue")}
                    onPress={handleOfflineLogin}
                    disabled={firstName === null || lastName == null}
                  />
                </View>
              </View>
            </View>
          )}
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
  mainContainer: {
    flex: 3,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  mainLoginContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: hp("3%"),
  },
  alternateLoginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: hp("3%"),
  },
  buttonContainer: {
    alignItems: "center",
    gap: hp("1%"),
  },
});

export default InitialSelectionView;
