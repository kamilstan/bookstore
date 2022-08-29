import {CustomerEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type CustomerRecordResult = [CustomerEntity[],FieldPacket[]];

export class CustomerRecord implements CustomerEntity {
    id?: string;
    userId?: string;
    fullName: string;
    email: string;

    constructor(obj:CustomerEntity) {
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
            throw new ValidationError('Pole "email" nie może być puste oraz nie może przekracać 255 znaków!');
        }
        if (typeof obj.email !== 'string') {
            throw new ValidationError('Format danych pola "email" jest nieprawidłowy!');
        }

        this.id = obj.id ?? null;
        this.userId = obj.userId;
        this.fullName = obj.fullName;
        this.email = obj.email;
    }

    async insert():Promise<void> {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Cannot insert customer that already exists')
        }
        await pool.execute('INSERT INTO `customer` (`id`, `userId`, `fullName`, `email`) VALUES (:id, :userId, :fullName, :email)', this)
    }

    static async getOneById (id: string):Promise<CustomerEntity> {
        const [results] = await pool.execute('SELECT * FROM `customer` WHERE `id` = :id', {
            id,
        }) as CustomerRecordResult;
        return results.length === 0 ? null : new CustomerRecord(results[0])
    }

    static async getAll (email: string): Promise<CustomerEntity[]>{
        const [results] = await pool.execute('SELECT * FROM `customer` WHERE `email` LIKE :search', {
            search: `%${email}%`
        }) as CustomerRecordResult;
        return results.map(result => new CustomerRecord(result))
    }
}