import {CustomerBookEntity} from "../types/customer_book/customer_book-entity";
import {ValidationError} from "../utils/handleErrors";

export class CustomerBookRecord implements CustomerBookEntity {
    id?: string;
    customer_id: string;
    book_id: string;
    reservedTo: Date;

    constructor(obj:CustomerBookEntity) {
        if (!obj.customer_id) {
            throw new ValidationError('Pole "customer_id" nie może być puste!');
        }
        if (!obj.book_id) {
            throw new ValidationError('Pole "book_id" nie może być puste!');
        }

        this.id = obj.id ?? null;
        this.customer_id = obj.customer_id;
        this.book_id = obj.book_id;
        this.reservedTo = obj.reservedTo;
    }
}