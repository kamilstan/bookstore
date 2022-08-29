import {CustomerBookEntity} from "../types/customer_book/customer_book-entity";
import {ValidationError} from "../utils/handleErrors";

export class CustomerBookRecord implements CustomerBookEntity {
    id?: string;
    customerId: string;
    bookId: string;
    reservedTo: Date;

    constructor(obj:CustomerBookEntity) {
        if (!obj.customerId) {
            throw new ValidationError('Pole "customer_id" nie może być puste!');
        }
        if (!obj.bookId) {
            throw new ValidationError('Pole "book_id" nie może być puste!');
        }

        this.id = obj.id ?? null;
        this.customerId = obj.customerId;
        this.bookId = obj.bookId;
        this.reservedTo = obj.reservedTo;
    }
}