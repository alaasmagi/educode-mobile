import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import NavigationProps from "../../types";
import GlobalStyles from "../layout/styles/GlobalStyles";
import NormalHeader from "../layout/headers/NormalHeader";
import NormalButton from "../layout/components/NormalButton";
import NormalLink from "../layout/components/NormalLink";
import ModeToggle from "../layout/components/ModeToggle";
import StepDivider from "../layout/components/StepDivider";
import QrGenerator from "../layout/components/QrGenerator";
import SuccessMessage from "../layout/components/SuccessMessage";
import ErrorMessage from "../layout/components/ErrorMessage";
import UnderlineText from "../layout/components/UnderlineText";

import { GenerateQrString } from "../businesslogic/services/QrGenLogic";
import { AddAttendanceCheck } from "../businesslogic/services/CourseAttendanceData";
import KeyboardVisibilityHandler from "../businesslogic/hooks/KeyboardVisibilityHandler";
import CreateAttendanceCheckModel from "../models/CreateAttendanceCheckModel";
import IconDataText from "../layout/components/DataText";

function CompleteAttendanceView({ navigation, route }: NavigationProps) {
  const {
    localData,
    attendanceId,
    workplaceId = null,
    stepNr: initialStep,
  } = route.params;
  const { t } = useTranslation();
  const isKeyboardVisible = KeyboardVisibilityHandler();

  const [isOnline, setIsOnline] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModeToggleInLeftPos, setIsModeToggleInLeftPos] = useState<boolean>(true);

  const stepNr = initialStep + 1;
  const [qrValue, setQrValue] = useState(() =>
    GenerateQrString(
      localData.studentCode,
      localData.fullName,
      attendanceId,
      workplaceId
    )
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQrValue(
        GenerateQrString(
          localData.studentCode,
          localData.fullName,
          attendanceId,
          workplaceId
        )
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, [localData.studentCode, attendanceId, workplaceId]);

  const refreshQrCode = () => {
    setQrValue(
      GenerateQrString(
        localData.studentCode,
        localData.fullName,
        attendanceId,
        workplaceId
      )
    );
  };

  const navigateBack = useCallback(() => {
    navigation.navigate("StudentMainView", {
      localData,
      attendanceId,
      workplaceId,
      stepNr: stepNr - 1,
    });
  }, [navigation, localData, attendanceId, workplaceId, stepNr]);

  const handleAttendanceCheckAdd = async () => {
    const attendanceCheck: CreateAttendanceCheckModel = {
      studentCode: localData.studentCode,
      fullName: localData.fullName,
      courseAttendanceId: attendanceId,
      workplaceId: parseInt(workplaceId) ?? null,
    };

    const status = await AddAttendanceCheck(attendanceCheck);

    if (status === true) {
      setSuccessMessage(t("attendance-check-added"));
      setTimeout(() => {
        setSuccessMessage(null);
        navigation.navigate("StudentMainView", { localData });
      }, 3000);
    } else {
      setErrorMessage(t(String(status)));
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const renderSharedData = () => (
    <View style={styles.data}>
      <IconDataText label={t("name")} text={localData.fullName} />
      <IconDataText label={t("attendance-id")} text={attendanceId} />
      <IconDataText
        label={t("workplace-id")}
        text={workplaceId || t("not-available")}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={GlobalStyles.anrdoidSafeArea}>
        <View style={styles.headerContainer}>
          <NormalHeader navigation={navigation} route={route} />
        </View>
        <View style={styles.onlineToggleContainer}>
          <ModeToggle
            textLeft={t("offline-mode")}
            textRight={t("online-mode")}
            isLeftSelected={isModeToggleInLeftPos}
            onPressLeft={() => {
              setIsOnline(false);
              setIsModeToggleInLeftPos(true);
            }}
            onPressRight={() => {
              setIsOnline(true);
              setIsModeToggleInLeftPos(false);
            }}
            isDisabled={localData.offlineOnly}
          />
        </View>
        <View style={styles.stepDividerContainer}>
          <StepDivider
            label={t(isOnline ? "step-end-attendance" : "step-show-qr")}
            stepNumber={stepNr}
          />
        </View>
        {isOnline ? (
          <>
            <View style={styles.qrContainer}>
              <View style={styles.underlineText}>
                <UnderlineText text={t("verify-details")} />
              </View>
              <View style={styles.dataContainer}>{renderSharedData()}</View>
              <View style={styles.messageContainer}>
                {successMessage && <SuccessMessage text={successMessage} />}
                {errorMessage && <ErrorMessage text={errorMessage} />}
              </View>
            </View>
            <View style={styles.lowNavButtonContainer}>
              <NormalLink
                text={t("something-wrong-back")}
                onPress={navigateBack}
              />
              <NormalButton
                text={t("check-in")}
                onPress={handleAttendanceCheckAdd}
              />
            </View>
          </>
        ) : (
          <>
            {!isKeyboardVisible && (
              <View style={styles.qrContainer}>
                <QrGenerator value={qrValue} />
              </View>
            )}
            {renderSharedData()}
            <View style={styles.lowNavButtonContainer}>
              <NormalLink
                text={t("something-wrong-back")}
                onPress={navigateBack}
              />
              <NormalButton text={t("refresh-qr")} onPress={refreshQrCode} />
            </View>
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  onlineToggleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  stepDividerContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  qrContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dataContainer: {
    flex: 1,
  },
  data: {
    alignSelf: "center",
    width: wp("75%"),
    borderWidth: 2,
    borderColor: "#BCBCBD",
    borderRadius: 20,
    gap: hp("0.2%"),
    padding: 10,
  },
  messageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lowNavButtonContainer: {
    flex: 1,
    gap: 4,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  underlineText: {
    marginTop: hp("5%"),
    marginBottom: hp("0.5%"),
  },
});

export default CompleteAttendanceView;
