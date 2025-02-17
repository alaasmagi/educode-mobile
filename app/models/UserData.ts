interface User {
    id: number;
    userType: {
        userType: string;
        id: number;
    };
    uniId: string;
    matriculationNumber?: string;
    firstName: string;
    lastName: string;
}

export default User;