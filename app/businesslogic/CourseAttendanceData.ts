import CreateAttendanceCheckModel from "../models/CreateAttendanceCheckModel";
import Storage from "../data/LocalDataAccess";
import { LocalKeys } from "../helpers/HardcodedLocalDataKeys";
import CourseModel from "../models/CourseModel";

export async function AddAttendanceCheck(model:CreateAttendanceCheckModel) : Promise<Boolean> {
    const token = await Storage.getData(LocalKeys.localToken);
    console.log(token);
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Course/AttendanceCheck/Add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                studentCode: model.studentCode,
                courseAttendanceId: model.courseAttendanceId,
                workplaceId: model.workplaceId,
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

export async function GetCurrentAttendance(uniId:string) : Promise<CourseModel|boolean|null> {
    const token = await Storage.getData(LocalKeys.localToken);
    console.log(token);
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Course/GetCurrentAttendanceCourse`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                uniId: uniId
            })
          });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        if (data.courseName) {
            const output:CourseModel = {
                courseName: data.courseName,
                courseCode: data.courseCode
            }
            return output;
        } else {
            return false;
        }
    } catch (error) {
        return null;
    }
}
