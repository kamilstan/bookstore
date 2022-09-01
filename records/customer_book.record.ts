import {CustomerBookEntity, CustomerBookIdEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type CustomerBookResults = [CustomerBookEntity[], FieldPacket[]];
type CustomerBookIdResults = [CustomerBookIdEntity[], FieldPacket[]];

export class CustomerBookRecord implements CustomerBookEntity {
    id?: string;
    customerId: string;
    bookId: string;
    purchaseDate: string;

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
        this.purchaseDate = obj.purchaseDate;
    }

    async insertOne(): Promise<void> {
        await pool.execute(
            'INSERT INTO `customer_book` (`id`, `customerId`, `bookId`,`purchaseDate`)VALUES(:id,:customerId, :bookId, :purchaseDate)',
            this
        );
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