import {UserEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";

export class UserRecord implements UserEntity {
    id?: string;
    email: string;
    password?: string;
    role: string;
    registerToken?: string;

    constructor(obj: UserEntity) {
        if (!obj.email || obj.email.length > 255) {
            throw new ValidationError('Pole"email" nie może być puste oraz zawierać więcej niż 255 znaków!');
        }
        if (typeof obj.email !== 'string') {
            throw new ValidationError('Format danych pola "email" jest nieprawdiłowy!');
        }
        if (!obj.role) {
            throw new ValidationError('Pole "role" nie może być puste!');
        }
        if (obj.password !== null && obj.password !== undefined && obj.password.length > 255) {
            throw new ValidationError('Pole "password" nie może być puste oraz zawierać więcej niż 255 znaków!');
        }

        this.id = obj.id ?? null;
        this.email = obj.email;
        this.password = obj.password ?? null;
        this.role = obj.role;
        this.registerToken = obj.registerToken ?? null;
    }
}