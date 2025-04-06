import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";

import GlobalStyles from "../layout/styles/GlobalStyles";
import NormalHeader from "../layout/headers/NormalHeader";
import NormalButton from "../layout/components/NormalButton";
import ModeToggle from "../layout/components/ModeToggle";
import QrScanner from "../layout/components/QrScanner";
import DataText from "../layout/components/DataText";
import TextBox from "../layout/components/TextBox";
import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import { RegexFilters } from "../businesslogic/helpers/RegexFilters";
import SuccessMessage from "../layout/components/SuccessMessage";
import ErrorMessage from "../layout/components/ErrorMessage";
import NormalMessage from "../layout/components/NormalMessage";
import { AddAttendanceCheck, GetCurrentAttendance } from "../businesslogic/services/CourseAttendanceData";
import { CourseAttendance } from "../models/CourseAttendance";
import CreateAttendanceCheckModel from "../models/CreateAttendanceCheckModel";
import ToSixDigit from "../businesslogic/helpers/NumberConverter";
import BackButtonHandler from "../businesslogic/hooks/BackButtonHandler";
import UnderlineText from "../layout/components/UnderlineText";

function TeacherMainView({ navigation, route }: NavigationProps) {
  const { localData } = route.params;
  const { t } = useTranslation();
  const isKeyboardVisible = KeyboardVisibilityHandler();

  const [qrScanView, setQrScanView] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [currentAttendanceData, setCurrentAttendanceData] = useState<CourseAttendance | null>(null);
  const [currentAttendancePlaceHolder, setCurrentAttendancePlaceHolder] = useState<string | null>(null);
  const [studentCode, setStudentCode] = useState("");
  const [workplaceId, setWorkplaceId] = useState("");
  const [lastAddedStudentCode, setLastAddedStudentCode] = useState("");
  const [lastAddedStudentWorkplaceId, setLastAddedStudentWorkplaceId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [normalMessage, setNormalMessage] = useState<string | null>(null);

  BackButtonHandler(navigation);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      if (RegexFilters.attendanceCheckData.test(data)) {
        const attendanceCheckData = data.split("-");
        const timestamp = Math.floor(Date.now() / 1000);

        if (timestamp - parseInt(attendanceCheckData[0]) > 120) {
          setErrorMessage(t("timestamp-error"));
        } else {
          const model: CreateAttendanceCheckModel = {
            courseAttendanceId: parseInt(attendanceCheckData[1]),
            workplaceId: parseInt(attendanceCheckData[2]) ?? null,
            studentCode: attendanceCheckData[3],
          };

          const response = await AddAttendanceCheck(model);

          if (typeof response === "string") {
            setErrorMessage(t(response));
            setTimeout(() => setErrorMessage(null), 3000);
          } else {
            setSuccessMessage(`${t("attendance-check-add-success")} ${attendanceCheckData[3]}`);
            setLastAddedStudentCode(attendanceCheckData[3]);
            setLastAddedStudentWorkplaceId(attendanceCheckData[2]);
            setTimeout(() => setSuccessMessage(null), 3000);
          }
        }
      } else {
        setErrorMessage(t("attendance-check-add-fail"));
      }

      setTimeout(() => setScanned(false), 2000);
      setTimeout(() => setErrorMessage(null), 3000);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const fetchCurrentAttendance = async () => {
    const status = await GetCurrentAttendance(localData.uniId);
    if (typeof status === "string") {
      setCurrentAttendancePlaceHolder(status);
    } else {
      setCurrentAttendanceData(status);
    }
  };

  const isStudentCodeValid = () => RegexFilters.studentCode.test(studentCode);

  const handleAddStudentManually = async () => {
    Keyboard.dismiss();
    if (workplaceId !== "" && !RegexFilters.defaultId.test(workplaceId)) {
      setErrorMessage(t("wrong-studentcode"));
      setTimeout(() => setErrorMessage(null), 3000);
    }

    const model: CreateAttendanceCheckModel = {
      studentCode: studentCode,
      courseAttendanceId: Number(currentAttendanceData!.attendanceId),
      workplaceId: parseInt(workplaceId) ?? null,
    };

    const response = await AddAttendanceCheck(model);

    if (typeof response === "string") {
      setErrorMessage(t(response));
      setTimeout(() => setErrorMessage(null), 3000);
    } else {
      setSuccessMessage(`${t("attendance-check-add-success")} ${studentCode}`);
      setLastAddedStudentCode(studentCode);
      setLastAddedStudentWorkplaceId(workplaceId);
      setTimeout(() => setSuccessMessage(null), 3000);
    }

    setStudentCode("");
    setWorkplaceId("");
  };

  useEffect(() => {
    fetchCurrentAttendance();
    const interval = setInterval(() => fetchCurrentAttendance(), 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
        <View style={styles.headerContainer}>
          <NormalHeader navigation={navigation} route={route} />
        </View>
        <View style={styles.onlineToggleContainer}>
          <ModeToggle
            textLeft={t("scan-student")}
            textRight={t("add-manually")}
            onPressLeft={() => setQrScanView(true)}
            onPressRight={() => setQrScanView(false)}
            isDisabled={!currentAttendanceData}
          />
        </View>

        {!isKeyboardVisible && (
          <View style={styles.currentAttendanceContainer}>
            <View style={styles.data}>
              <DataText
                iconName="school-icon"
                text={
                  currentAttendanceData
                    ? `${currentAttendanceData.courseName} (${currentAttendanceData.courseCode})`
                    : t(String(currentAttendancePlaceHolder))
                }
              />
              <DataText
                iconName="key-icon"
                text={currentAttendanceData ? ToSixDigit(Number(currentAttendanceData.attendanceId)) : ""}
              />
            </View>
          </View>
        )}

        {qrScanView ? (
          <>
            <View style={styles.qrScannerContainer}>
              {currentAttendanceData && <QrScanner onQrScanned={handleBarcodeScanned} />}
            </View>
            <View style={styles.messageContainer}>
              {successMessage && !isKeyboardVisible && <SuccessMessage text={successMessage} />}
              {errorMessage && !isKeyboardVisible && <ErrorMessage text={errorMessage} />}
              {normalMessage && !isKeyboardVisible && <NormalMessage text={normalMessage} />}
            </View>
          </>
        ) : (
          <>
            <View style={styles.messageContainer}>
              {successMessage && !isKeyboardVisible && <SuccessMessage text={successMessage} />}
              {errorMessage && !isKeyboardVisible && <ErrorMessage text={errorMessage} />}
            </View>
            <View style={styles.manualInputContainer}>
              <View style={styles.textBoxes}>
                <TextBox
                  iconName="person-icon"
                  placeHolder={`${t("student-code")}*`}
                  value={studentCode}
                  onChangeText={(text) => setStudentCode(text.trim())}
                  autoCapitalize="characters"
                />
                <TextBox
                  iconName="work-icon"
                  placeHolder={t("workplace-id")}
                  value={workplaceId}
                  onChangeText={(text) => setWorkplaceId(text.trim())}
                />
              </View>
              <NormalButton
                text={t("add-manually")}
                onPress={handleAddStudentManually}
                disabled={!isStudentCodeValid()}
              />
            </View>
            {!isKeyboardVisible && (
              <View style={styles.lastAddedStudentContainer}>
                <UnderlineText text={t("last-student")} />
                <View style={styles.data}>
                  <DataText iconName="person-icon" text={lastAddedStudentCode || t("no-last-added-student")} />
                  <DataText iconName="work-icon" text={lastAddedStudentWorkplaceId || ""} />
                </View>
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1.5,
    justifyContent: "center",
  },
  onlineToggleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  currentAttendanceContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
  },
  qrScannerContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textBoxes: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
  manualInputContainer: {
    flex: 1.5,
    gap: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  lastAddedStudentContainer: {
    flex: 1.5,
    justifyContent: "flex-end",
  },
  messageContainer: {
    flex: 2,
    justifyContent: "flex-start",
  },
  data: {
    alignSelf: "center",
    width: "90%",
    borderWidth: 2,
    borderColor: "#BCBCBD",
    borderRadius: 20,
    gap: 10,
    padding: 10,
  },
});

export default TeacherMainView;
