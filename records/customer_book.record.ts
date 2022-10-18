import {CustomerBookEntity, CustomerBookIdEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type CustomerBookResults = [CustomerBookEntity[], FieldPacket[]];
type CustomerBookIdResults = [CustomerBookIdEntity[], FieldPacket[]];

export class CustomerBookRecord implements CustomerBookEntity {
    id: string;
    customerId: string;
    bookId: string;
    purchaseDate: string;
    bookCount: number;

    constructor(obj: CustomerBookEntity) {
        if (!obj.customerId) {
            throw new ValidationError('Pole "customer_id" nie może być puste!');
        }
        if (!obj.bookId) {
            throw new ValidationError('Pole "book_id" nie może być puste!');
        }

        this.id = obj.id ?? uuid();
        this.customerId = obj.customerId;
        this.bookId = obj.bookId;
        this.purchaseDate = obj.purchaseDate;
        this.bookCount = obj.bookCount;
    }

    async insertPurchase():Promise<void> {
        console.log(this)
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Cannot insert purchase that already exists')
        };
        await pool.execute('INSERT INTO `customer_book` (`id`, `customerId`, `bookId`, `purchaseDate`, `bookCount`) VALUES (:id, :customerId, :bookName, :purchaseDate, :bookCount)', this)
    }

    static async getAllByCustomerId(customerId: string): Promise<CustomerBookEntity[]> {
        const [results] = (await pool.execute('SELECT * FROM `customer_book` WHERE `customerId` = :customerId ', {
            customerId,
        })) as CustomerBookResults;
        return results.length === 0 ? null : results.map(obj => new CustomerBookRecord(obj));
    }
    static async getAllBooksByCustomerId(customerId:string): Promise<CustomerBookIdEntity[]> {
        const [results] = (await pool.execute('SELECT `customer_book`.`book_id` FROM `customer_book` where `customerId` = :customerId ',{
            customerId: customerId,
        })) as CustomerBookIdResults;
        return results.length === 0 ? null : results.map(obj => obj);
    }

    static async getOneByCustomerIdAndBookId(customerId: string, bookId: string): Promise<CustomerBookEntity> {
        const [results] = (await pool.execute('SELECT * FROM `customer_book` WHERE `customerId` = :customerId AND bookId = :bookId', {
            customerId,
            bookId,
        })) as CustomerBookResults;
        return results.length === 0 ? null : new CustomerBookRecord(results[0]);
    }

    static async deleteOneById(id: string): Promise<void> {
        await pool.execute('DELETE FROM `customer_book` WHERE `id` = :id', {
            id,
        });
    }

    static async deleteManyByBookId(bookId: string): Promise<void> {
        await pool.execute('DELETE FROM `customer_book` WHERE `bookId` = :bookId', {
            bookId,
        });
    }
}