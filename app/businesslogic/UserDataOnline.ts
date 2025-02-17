import User from '../models/UserData'


export async function GetUserDataByUniId(uniId: string): Promise<User | null> {
    try {
        const response = await fetch(`${process.env.API_URL}/User/UniId/${uniId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const data: User = await response.json();
        console.log(data.lastName);
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}