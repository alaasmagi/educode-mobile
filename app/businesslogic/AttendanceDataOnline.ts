export async function CreateUserAccount(model:AttendanceCheckData) : Promise<Boolean> {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/User/Register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
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