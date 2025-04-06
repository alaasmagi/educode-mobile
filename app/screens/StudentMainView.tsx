import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

import NavigationProps from "../../types";
import GlobalStyles from "../layout/styles/GlobalStyles";

import SeparatorLine from "../layout/components/SeparatorLine";
import TextBox from "../layout/components/TextBox";
import QrScanner from "../layout/components/QrScanner";
import NormalHeader from "../layout/headers/NormalHeader";
import NormalButton from "../layout/components/NormalButton";
import StepDivider from "../layout/components/StepDivider";
import Checkbox from "../layout/components/Checkbox";
import NormalLink from "../layout/components/NormalLink";
import ErrorMessage from "../layout/components/ErrorMessage";

import { RegexFilters } from "../businesslogic/helpers/RegexFilters";
import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import BackButtonHandler from "../businesslogic/hooks/BackButtonHandler";
import ToSixDigit from "../businesslogic/helpers/NumberConverter";
import GetSixDigitTimeStamp from "../businesslogic/helpers/TimeStamp";

function StudentMainView({ navigation, route }: NavigationProps) {
  const { t } = useTranslation();
  const isKeyboardVisible = KeyboardVisibilityHandler();
  BackButtonHandler(navigation);

  const {
    localData,
    attendanceId: routeAttendanceId,
    workplaceId: routeWorkplaceId,
    stepNr: initialStepNr = 1,
  } = route.params || {};

  const [stepNr, setStepNr] = useState(initialStepNr);
  const [scanned, setScanned] = useState(false);

  const [attendanceId, setAttendanceId] = useState(routeAttendanceId || "");
  const [scannedAttendanceData, setScannedAttendanceData] = useState("");
  const [workplaceId, setWorkplaceId] = useState(routeWorkplaceId || "");

  const [scanForWorkplace, setScanForWorkplace] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearErrorMessage = () => setTimeout(() => setErrorMessage(null), 3000);

  const isTimestampValid = (timestampStr: string): boolean => {
    const scannedTime = parseInt(timestampStr);
    const currentTime = GetSixDigitTimeStamp();
    return currentTime - scannedTime <= 20;
  };

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;

    setScanned(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (stepNr === 1 && RegexFilters.attendanceScanId.test(data)) {
      const [idPart, timestampPart] = data.split("-");
      if (!isTimestampValid(timestampPart)) {
        setErrorMessage(t("timestamp-error"));
        clearErrorMessage();
      } else {
        setScannedAttendanceData(data);
        setAttendanceId(ToSixDigit(Number(idPart)));
      }
    } else if (stepNr === 2 && RegexFilters.defaultId.test(data)) {
      setWorkplaceId(ToSixDigit(Number(data)));
    } else {
      setErrorMessage(t("invalid-qr"));
      clearErrorMessage();
    }

    setTimeout(() => setScanned(false), 3000);
  };

  const handleNextStep = () => {
    const [, timestampPart] = scannedAttendanceData.split("-");
    if (!isTimestampValid(timestampPart)) {
      setErrorMessage(t("timestamp-error"));
      clearErrorMessage();
      return;
    }

    if (scanForWorkplace) {
      setStepNr(2);
      setScanForWorkplace(false);
      Keyboard.dismiss();
    } else {
      navigation.navigate("CompleteAttendanceView", {
        localData,
        attendanceId,
        stepNr,
      });
    }
  };

  const handleWorkplaceSubmit = () => {
    navigation.navigate("CompleteAttendanceView", {
      localData,
      attendanceId,
      workplaceId,
      stepNr,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
        <View style={styles.headerContainer}>
          <NormalHeader navigation={navigation} route={route} />
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.stepDividerContainer}>
            <StepDivider stepNumber={stepNr} label={stepNr === 1 ? t("step-scan-board") : t("step-scan-workplace")} />
          </View>

          {!isKeyboardVisible && (
            <View style={styles.qrContainer}>
              <QrScanner onQrScanned={handleBarcodeScanned} />
            </View>
          )}

          {stepNr === 1 ? (
            <View style={styles.attendanceHandlerContainer}>
              <View style={styles.alternativeMethodContainer}>
                <SeparatorLine text={t("or-enter-id-manually")} />
                <TextBox
                  iconName="key-icon"
                  placeHolder={t("attendance-id")}
                  value={scannedAttendanceData}
                  onChangeText={(text) => setScannedAttendanceData(text.trim())}
                />
              </View>

              <View style={styles.checkboxContainer}>
                {errorMessage ? (
                  <ErrorMessage text={errorMessage} />
                ) : (
                  <Checkbox label={t("add-workplace")} onChange={() => setScanForWorkplace((prev) => !prev)} />
                )}
              </View>

              <View style={styles.lowNavButtonContainer}>
                <NormalButton
                  text={t("continue")}
                  onPress={handleNextStep}
                  disabled={!RegexFilters.attendanceScanId.test(scannedAttendanceData)}
                />
              </View>
            </View>
          ) : (
            <View style={styles.workplaceHandlerContainer}>
              <View style={styles.alternativeMethodContainer}>
                <SeparatorLine text={t("or-enter-id-manually")} />
                <TextBox
                  iconName="work-icon"
                  placeHolder={t("workplace-id")}
                  value={workplaceId}
                  onChangeText={(text) => setWorkplaceId(text.trim())}
                />
              </View>

              <View style={styles.checkboxContainer}>{errorMessage && <ErrorMessage text={errorMessage} />}</View>

              <View style={styles.linkContainer}>
                <NormalLink text={t("something-wrong-back")} onPress={() => setStepNr(1)} />
              </View>

              <View style={styles.lowNavButtonContainer}>
                <NormalButton
                  text={t("continue")}
                  onPress={handleWorkplaceSubmit}
                  disabled={!RegexFilters.defaultId.test(workplaceId)}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 3,
    justifyContent: "center",
  },
  mainContainer: {
    flex: 14,
  },
  stepDividerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  alternativeMethodContainer: {
    flex: 2,
    gap: 25,
    alignItems: "center",
  },
  attendanceHandlerContainer: {
    flex: 5,
  },
  workplaceHandlerContainer: {
    flex: 5,
  },
  checkboxContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  lowNavButtonContainer: {
    flex: 2,
    alignItems: "center",
  },
  linkContainer: {
    paddingBottom: 4,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default StudentMainView;
