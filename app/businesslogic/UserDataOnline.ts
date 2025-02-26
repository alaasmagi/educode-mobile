import User from '../models/UserData';
import bcrypt from 'react-native-bcrypt';
import Storage from '../data/LocalDataAccess';
import { LocalKeys } from '../helpers/HardcodedLocalDataKeys';


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