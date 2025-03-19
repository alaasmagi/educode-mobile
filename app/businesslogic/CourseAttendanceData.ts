import CreateAttendanceCheckModel from "../models/CreateAttendanceCheckModel";
import Storage from "../data/LocalDataAccess";
import { LocalKeys } from "../helpers/HardcodedLocalDataKeys";
import AttendanceModel from "../models/AttendanceModel";
import { GetUserToken } from "./UserDataOffline";
import Constants from "expo-constants";
import axios from "axios";

export async function AddAttendanceCheck(
  model: CreateAttendanceCheckModel
): Promise<boolean> {
  const token = await Storage.getData(LocalKeys.localToken);
  try {
    await axios.post(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/Course/AttendanceCheck/Add`,
      {
        studentCode: model.studentCode,
        courseAttendanceId: model.courseAttendanceId,
        workplaceId: model.workplaceId,
        creator: "educode-mobile",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function GetCurrentAttendance(
  uniId: string
): Promise<AttendanceModel | null> {
  const token = await GetUserToken();
  try {
    const response = await axios.post(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/Course/GetCurrentAttendance`,
      { uniId: uniId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    if (data.courseName) {
      return {
        attendanceId: data.attendanceId,
        courseName: data.courseName,
        courseCode: data.courseCode,
      } as AttendanceModel;
    }
    return null;
  } catch (error) {
    return null;
  }
}
