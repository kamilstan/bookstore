import {CustomerEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";

export class CustomerRecord implements CustomerEntity {
    id?: string;
    user_id: string;
    fullName: string;
    email: string;

    constructor(obj:CustomerEntity) {
        if (!obj.user_id) {
            throw new ValidationError(' Pole "user_id" nie może być puste!');
        }
        if (!obj.fullName || obj.fullName.length > 100) {
            throw new ValidationError('Pole "fullName" nie może być puste oraz przekracać 100 znaków!');
        }
        if (typeof obj.fullName !== 'string') {
            throw new ValidationError('Format danych pola "fullName" jest nieprawidłowy!');
        }
        if (!obj.email || obj.email.length > 255) {
            throw new ValidationError('Pole "email" nie może być puste oraz nie może przekracać 255 znaków!');
        }
        if (typeof obj.email !== 'string') {
            throw new ValidationError('Format danych pola "email" jest nieprawidłowy!');
        }

        this.id = obj.id ?? null;
        this.user_id = obj.user_id;
        this.fullName = obj.fullName;
        this.email = obj.email;
    }
}