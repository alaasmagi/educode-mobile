import OnlineUserModel from "../models/OnlineUserModel";
import Storage from "../data/LocalDataAccess";
import { LocalKeys } from "../helpers/HardcodedLocalDataKeys";
import CreateUserModel from "../models/CreateUserModel";
import VerifyOTPModel from "../models/VerifyOTPModel";
import ChangePasswordModel from "../models/ChangePasswordModel";
import LocalUserData from "../models/LocalUserDataModel";
import axios from 'axios';

import {
  GetUserToken,
  SaveOfflineUserData,
  SaveUserToken,
} from "./UserDataOffline";
import Constants from "expo-constants";

export async function TestConnection(): Promise<boolean> {
  try {
    const response = await axios.get(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/TestConnection`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function UserLogin(uniId: string, password: string): Promise<boolean> {
  try {
    const response = await axios.post(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/Login`,
      {
        uniId: uniId,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    Storage.saveData(LocalKeys.localToken, response.data.token);
    return true;
  } catch (error) {
    return false;
  }
}

export async function CreateUserAccount(
  model: CreateUserModel
): Promise<boolean> {
  try {
    const response = await axios.post(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/Register`,
      {
        fullName: model.fullName,
        uniId: model.uniId,
        studentCode: model.studentCode,
        password: model.password,
        userRole: "Student",
        creator: "educode-mobile",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function FetchAndSaveUserDataByUniId(uniId: string): Promise<boolean> {
  const token = await GetUserToken();
  try {
    const response = await axios.get(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/UniId/${uniId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: OnlineUserModel = response.data;
    const localData: LocalUserData = {
      userType: data.userType.userType,
      uniId: data.uniId,
      studentCode: data.studentCode,
      offlineOnly: false,
      fullName: data.fullName,
    };

    SaveOfflineUserData(localData);
    return true;
  } catch (error) {
    return false;
  }
}

export async function RequestOTP(uniId: string): Promise<boolean> {
  try {
    const response = await axios.post(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/RequestOTP`,
      {
        uniId: uniId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function VerifyOTP(model: VerifyOTPModel): Promise<boolean> {
  try {
    const response = await axios.post(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/VerifyOTP`,
      {
        uniId: model.uniId,
        otp: model.otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    SaveUserToken(response.data.token);
    return true;
  } catch (error) {
    return false;
  }
}

export async function ChangeUserPassword(
  model: ChangePasswordModel
): Promise<boolean> {
  const token = await GetUserToken();
  try {
    const response = await axios.patch(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/ChangePassword`,
      {
        uniId: model.uniId,
        newPassword: model.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function DeleteUser(uniId: string): Promise<boolean> {
  const token = await GetUserToken();
  try {
    await axios.delete(
      `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}/User/Delete/${uniId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}
