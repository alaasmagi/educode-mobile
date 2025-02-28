import User from '../models/UserData';
import Storage from '../data/LocalDataAccess';
import { LocalKeys } from '../helpers/HardcodedLocalDataKeys';
import CreateUserModel from '../models/CreateUserModel';
import ForgotPasswordModel from '../models/ForgotPasswordModel';


export async function UserLogin (uniId:string, password:string) : Promise<boolean>
{
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/User/Login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uniId : uniId,
              password: password,
            })
          });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        Storage.saveData(LocalKeys.localToken, data.token);
        return true;
    } catch (error) {
        return false;
    }
}

export async function CreateUserAccount(model:CreateUserModel) : Promise<Boolean> {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/User/Register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: model.fullName,
                uniId: model.uniId,
                studentCode: model.studentCode,
                password: model.password,
                userRole: "Student",
                creator: "educode-mobile"
            })
          });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

export async function GetUserDataByUniId(uniId: string): Promise<User | null> {
    const token = await Storage.getData(LocalKeys.localToken);
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/User/UniId/${uniId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const data: User = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}


export async function RequestPasswordResetCode(model: ForgotPasswordModel): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/User/RequestReset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uniId: model.uniId,
                studentCode: model.studentCode
            })
          });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}
