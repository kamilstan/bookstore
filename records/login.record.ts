import {LoginEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";

export class LoginRecord implements LoginEntity {
    id?: string;
    user_id: string;
    refreshToken: string;

    constructor(obj:LoginEntity) {
        if (!obj.user_id) {
            throw new ValidationError('Pole "user_id" nie może być puste!');
        }
        if (typeof obj.user_id !== 'string') {
            throw new ValidationError('Pole "user_id" musi być tekstem!');
        }
        if (!obj.refreshToken) {
            throw new ValidationError('Pole "refreshToken" nie może być puste!');
        }
        if (typeof obj.refreshToken !== 'string') {
            throw new ValidationError('Pole "refreshToken" musi być tekstem!');
        }

        this.id = obj.id ?? null;
        this.user_id = obj.user_id;
        this.refreshToken = obj.refreshToken;
    }
}