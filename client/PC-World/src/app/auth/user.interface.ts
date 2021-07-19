export interface IUser {
    email: string;
    _id: string;
    isAdmin: boolean;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    city?: string;
    location?: string;
}
