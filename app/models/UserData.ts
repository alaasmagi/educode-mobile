interface User {
    id: number;
    userType: {
        userType: string;
        id: number;
    };
    uniId: string;
    studentCode?: string;
    fullName: string;
}

export default User;