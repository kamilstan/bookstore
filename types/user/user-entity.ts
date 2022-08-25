export interface UserEntity {
    id?: string;
    email: string;
    password?: string;
    role: string;
    registerToken?: string;
}