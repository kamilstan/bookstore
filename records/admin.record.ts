import {AdminEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";

export class AdminRecord implements AdminEntity {
    id?: string;
    userId: string;
    fullName: string;
    email: string;

    constructor(obj:AdminEntity) {
        if (!obj.userId) {
            throw new ValidationError(' Pole "userId" nie może być puste!');
        }
        if (!obj.fullName || obj.fullName.length > 100) {
            throw new ValidationError('Pole "fullName" nie może być puste oraz przekracać 100 znaków!');
        }
        if (typeof obj.fullName !== 'string') {
            throw new ValidationError('Format danych pola "fullName" jest nieprawidłowy!');
        }
        if (!obj.email || obj.email.length > 255) {
            throw new ValidationError('Pole "e-mail" nie może być puste oraz nie może przekracać 255 znaków!');
        }
        if (typeof obj.email !== 'string') {
            throw new ValidationError('Format danych pola "e-mail" jest nieprawidłowy!');
        }

        this.id = obj.id ?? null;
        this.userId = obj.userId;
        this.fullName = obj.fullName;
        this.email = obj.email;
    }

}