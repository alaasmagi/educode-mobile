export function GenerateQrString(studentCode: string, fullName: string, attendanceId: number, workplaceId: number) {
  const names: string[] = fullName.split(" ");
  const timestamp = Math.floor(Date.now() / 1000);
  const result =
    timestamp + "-" + attendanceId + "-" + workplaceId + "-" + names[0] + "+" + names[1] + "-" + studentCode;
  return result;
}
