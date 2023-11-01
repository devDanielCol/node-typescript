export interface IUser {
    password?: string;
    email: string;
    isactive: boolean;
    validatedAccount: boolean;
    ref: unknown;
}

export interface IUserData {
    _id: string;
    name: string;
    lastname: string;
    IsSubscriptor: boolean;
}

export interface IUserRef extends IUser, IUserData {}
