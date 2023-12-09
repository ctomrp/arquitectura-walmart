export interface User{
    email: string,
    password: string,
}

export interface UserModel{
    id: number;
    exp: Date,
    iat: Date;
    group: string;
}