import {BookEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type BookRecordResult = [BookEntity[], FieldPacket[]];

export class BookRecord implements BookEntity{
    id?: string;
    title: string;
    author: string;
    description: string;
    price: number;
    count: number;
    review: number;

    constructor(obj:BookEntity) {
        if (!obj.title || obj.title.length > 200) {
            throw new ValidationError('Pole "title" nie może być puste oraz nie może przekracać 200 znaków!');
        }
        if (typeof obj.title !== 'string') {
            throw new ValidationError('Format danych pola "title" jest nieprawidłowy!');
        }
        if (!obj.author || obj.author.length > 100) {
            throw new ValidationError('Pole "author" nie może być puste oraz nie może przekracać 100 znaków!');
        }
        if (typeof obj.author !== 'string') {
            throw new ValidationError('Format danych pola "author" jest nieprawidłowy!');
        }
        if (!obj.description || obj.description.length > 1000) {
            throw new ValidationError('Pole "description" nie może być puste oraz nie może przekracać 1000 znaków!');
        }
        if (typeof obj.description !== 'string') {
            throw new ValidationError('Format danych pola "description" jest nieprawidłowy!');
        }
        if (obj.price < 0 || obj.price > 999999) {
            throw new ValidationError('Pole "price" nie może być mniejsze od 0 oraz nie może być większe niż 999999!');
        }
        if (typeof obj.price !== 'number') {
            throw new ValidationError('Format danych pola "price" jest nieprawidłowy!');
        }
        if (obj.count < 0 || obj.count > 999999) {
            throw new ValidationError('Pole "count" nie może być mniejsze od 0 oraz nie może być większe niż 999999!');
        }
        if (typeof obj.count !== 'number') {
            throw new ValidationError('Format danych pola "count" jest nieprawidłowy!');
        }

        if (obj.review < 0 || obj.review > 6) {
            throw new ValidationError('Pole "review" nie może być mniejsze od 0 oraz nie może być większe niż 6!');
        }
        if (typeof obj.review !== 'number') {
            throw new ValidationError('Format danych pola "review" jest nieprawidłowy!');
        }

        this.id = obj.id ?? null;
        this.title = obj.title;
        this.author = obj.author;
        this.description = obj.description;
        this.price = obj.price;
        this.count = obj.count;
        this.review = obj.review;
    }

    async insert(): Promise<void> {
        if(!this.id) {
            this.id = uuid()
        } else {
            throw new ValidationError('Cannot insert the book that already exists')
        }
        await pool.execute('INSERT INTO `book` (`id`, `title`, `author`, `description`, `price`, `count`, `review`) VALUES (:id, :title, :author, :description, :price, :count, :review)', this)
    }

    async update(): Promise<void> {
        await pool.execute(
            'UPDATE `book` SET  `title` = :title, `author` = :author, `description` = :description, `price` = :price ,`count` = :count , `review` = :review  WHERE `id` = :id',
            {
                id: this.id,
                title: this.title,
                author: this.author,
                description: this.description,
                price: this.price,
                count: this.count,
                review: this.review,
            }
        );
    }

    static async getOneById(id: string): Promise<BookEntity> {
        const [results] = (await pool.execute('SELECT * FROM `book` WHERE `id` = :id', {
            id,
        })) as BookRecordResult;
        return results.length === 0 ? null : new BookRecord(results[0]);
    }
    static async getAll(title:string): Promise<BookEntity[]> {
        const [results] = await pool.execute('SELECT * FROM `book` WHERE `title` LIKE :search', {
            search: `%${title}%`
        }) as BookRecordResult;
        return results.map(result => new BookRecord(result))
    }

}