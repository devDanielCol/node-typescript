export interface IUser {
    password: string;
    email: string;
    isactive: boolean;
    validatedAccount: boolean;
    userDataId: unknown;
}

export interface IUserData {
    _id: string;
    name: string;
    lastname: string;
    IsSubscriptor: boolean;
    userLoginId: unknown;
}

export interface IUserRef extends IUser, IUserData {}
