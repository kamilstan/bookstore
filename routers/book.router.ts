import {Router} from "express";
import {BookRecord} from "../records/book.record";

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