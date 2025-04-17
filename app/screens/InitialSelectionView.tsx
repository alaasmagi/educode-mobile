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
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import * as SplashScreen from "expo-splash-screen";
import { useTranslation } from "react-i18next";
import i18next from "../businesslogic/services/i18next";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import GlobalStyles from "../layout/styles/GlobalStyles";
import NormalButton from "../layout/components/NormalButton";
import SeparatorLine from "../layout/components/SeparatorLine";
import TextBox from "../layout/components/TextBox";
import NormalMessage from "../layout/components/NormalMessage";

import NavigationProps from "../../types";
import FormHeader from "../layout/headers/FormHeader";
import BackButtonHandler from "../businesslogic/hooks/BackButtonHandler";
import LocalUserData from "../models/LocalUserDataModel";
import {
  DeleteOfflineUserData,
  GetCurrentLanguage,
  GetOfflineUserData,
  SaveOfflineUserData,
} from "../businesslogic/services/UserDataOffline";
import {
  FetchAndSaveUserDataByUniId,
  TestConnection,
} from "../businesslogic/services/UserDataOnline";
import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import { RegexFilters } from "../businesslogic/helpers/RegexFilters";

function InitialSelectionView({ navigation }: NavigationProps) {
  const { t } = useTranslation();
  const [stepNr, setStepNr] = useState<number>(1);
  const [studentCode, setStudentCode] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [normalMessage, setNormalMessage] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const isKeyboardVisible = KeyboardVisibilityHandler();
  const [isConnection, setIsConnection] = useState<boolean>(false);

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

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  );

  const isNameFormValid = () => fullName !== "" && !fullName.includes(";");
  const isStudentCodeValid = () => RegexFilters.studentCode.test(String(studentCode));

  useEffect(() => {
    const init = async () => {
      const connection = await TestConnection();
      const lang = await GetCurrentLanguage();
      if (lang) i18next.changeLanguage(lang);
      if (!connection) {
        setNormalMessage(t("login-again"));
        setTimeout(() => setNormalMessage(null), 3000);
        setIsConnection(false);
      } else {
        setNormalMessage(null);
        setIsConnection(true);
      }

      let localData = await GetOfflineUserData();
      if (localData?.offlineOnly === true) {
        navigation.navigate("StudentMainView", { localData });
      } else if (localData?.offlineOnly === false) {
        const loginSuccess = await FetchAndSaveUserDataByUniId(
          String(localData?.uniId)
        );
        if (typeof(loginSuccess) !== "string") {
          localData = await GetOfflineUserData();
          const target =
            localData?.userType === "Teacher"
              ? "TeacherMainView"
              : "StudentMainView";
          navigation.navigate(target, { localData });
        } else {
          setNormalMessage(t("login-again"));
          setTimeout(() => setNormalMessage(null), 3000);
        }
      }
    };

    init();
  }, []);

  const handleOfflineLogin = async () => {
    Keyboard.dismiss();

    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert(
          t("camera-permission-denied"),
          t("camera-permission-denied-message")
        );
      }
    }
    await DeleteOfflineUserData();
    const localData: LocalUserData = {
      userType: "Student",
      studentCode: String(studentCode),
      fullName: fullName.trim(),
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
          <View style={styles.headerContainer}>
            <FormHeader />
          </View>
          {stepNr == 1 && (
            <View style={styles.mainContainer}>
              {!isKeyboardVisible && (
                <View style={styles.mainLoginContainer}>
                  <NormalButton
                    text={t("log-in")}
                    onPress={() => navigation.navigate("LoginView")}
                    disabled={!isConnection}
                  />
                  <NormalButton
                    text={t("register-as-student")}
                    onPress={() => navigation.navigate("CreateAccountView")}
                    disabled={!isConnection}
                  />
                  {normalMessage && <NormalMessage text={normalMessage} />}
                </View>
              )}
              <View style={styles.alternateLoginContainer}>
                <SeparatorLine text={t("or-use-offline-only")} />
                <TextBox
                  iconName="person-icon"
                  label={t("student-code")}
                  placeHolder={t("for-example-abbr") + " 123456ABCD"}
                  onChangeText={(text) => setStudentCode(text.trim())}
                  value={studentCode ?? ""}
                  autoCapitalize="characters"
                />
                <TextBox
                  iconName="person-icon"
                  label={`${t("name")}`}
                  value={fullName}
                  placeHolder={t("for-example-abbr") + " Andres Tamm"}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
                <NormalButton
                  text={t("continue")}
                  onPress={handleOfflineLogin}
                  disabled={!isStudentCodeValid() || !isNameFormValid()}
                />
              </View>
            </View>
          )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 6,
  },
  messageContainer: {
    flex: 0.5
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  mainLoginContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: hp("2%"),
  },
  alternateLoginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: hp("2%"),
  },
  buttonContainer: {
    alignItems: "center",
    gap: hp("1%"),
  },
});

export default InitialSelectionView;
