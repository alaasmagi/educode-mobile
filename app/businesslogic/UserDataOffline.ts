import Storage from "../data/LocalDataAccess";
import User from "../models/UserData";

export async function GetOfflineUserData():Promise<User|null> {
    const userData:User|null = await Storage.getData(process.env.EXPO_PUBLIC_LOCAL_DATA); 
    return userData;
}

export async function SaveOfflineUserData(userData) {
    await Storage.saveData(process.env.EXPO_PUBLIC_LOCAL_DATA, userData); 
}

export async function DeleteOfflineUserData() {
    await Storage.removeData(process.env.EXPO_PUBLIC_LOCAL_DATA);
}