import {LoginEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";

export class LoginRecord implements LoginEntity {
    id?: string;
    userId: string;
    refreshToken: string;

    constructor(obj:LoginEntity) {
        if (!obj.userId) {
            throw new ValidationError('Pole "user_id" nie może być puste!');
        }
        if (typeof obj.userId !== 'string') {
            throw new ValidationError('Pole "user_id" musi być tekstem!');
        }
        if (!obj.refreshToken) {
            throw new ValidationError('Pole "refreshToken" nie może być puste!');
        }
        if (typeof obj.refreshToken !== 'string') {
            throw new ValidationError('Pole "refreshToken" musi być tekstem!');
        }

        this.id = obj.id ?? null;
        this.userId = obj.userId;
        this.refreshToken = obj.refreshToken;
    }
}