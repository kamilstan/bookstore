import {Router} from "express";
import {BookRecord} from "../records/book.record";
import {CustomerBookRecord} from "../records/customer_book.record";
import {CustomerRecord} from "../records/customer.record";
import {ValidationError} from "../utils/handleErrors";
import {v4 as uuid} from "uuid";

export const bookRouter = Router()

.get('/search/:title?', async (req,res) => {
    const books = await BookRecord.getAll(req.params.title ?? '');
    res.json(books);
})

.get('/:id', async(req, res) => {
    const book = await BookRecord.getOneById(req.params.id);
    res.json(book);
})

.post('/', async(req, res) => {
    const book = new BookRecord(req.body);
    await book.insert();
    res.json(book);
})

.post('/:id/buy', async (req, res) => {
    const { bookId, customerId, count } = req.body;
    if (!bookId || !customerId) {
        throw new ValidationError('Brak wymaganych danych.');
    }
    const customer = await CustomerRecord.getOneByUserId(customerId);
    if (customer === null) {
        throw new ValidationError('Nie można dokonać zakupu, nieprawidłowe dane klienta.');
    }

    const book = await BookRecord.getOneById(bookId);
    if (book === null) {
        throw new ValidationError('Nie można dokonać zakupu, podana książka nie istnieje.');
    }
    if (book.count <= 0){
        throw new ValidationError('Nie można dokonać zakupu, brak towaru na magazynie.');
    }
    if (book.count < count){
        throw new ValidationError('Nie można zakupić takiej ilości towaru, brak wystarczającej ilości na magazynie.');
    }

    const purchaseDate = new Date().toLocaleString();
    // const purchaseDate = new Date();


    const purchase = new CustomerBookRecord({
        id: uuid(),
        customerId,
        bookId,
        purchaseDate,
    });
    console.log('purchase',purchase);


    await purchase.insertOne();

    book.count = book.count - count;
    const updatedBook = new BookRecord({...book});
    //
    await updatedBook.update();
    // console.log(updatedBook);
    // res.json('Zakupiono towar.');
    res.send('ok')
})

