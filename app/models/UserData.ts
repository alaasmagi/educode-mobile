interface User {
    id: number;
    userType: {
        userType: string;
    };
    uniId: string;
    studentCode?: string;
    fullName: string;
}

export default User;