import {Router} from "express";
import {CustomerRecord} from "../records/customer.record";
import {CustomerBookRecord} from "../records/customer_book.record";

export const customerRouter = Router()

    .get('/search/:email?', async(req,res) => {
        const customers = await CustomerRecord.getAll(req.params.email ?? '');
        res.json(customers);
    })

    .get('/:id', async(req,res) => {
        const customer = await CustomerRecord.getOneById(req.params.id);
        res.json(customer);
    })
    .get('/home/:id', async(req,res) => {
        const customer = await CustomerRecord.getOneByUserId(req.params.id);
        res.json(customer);
    })

    .get('/purchase/:id', async(req,res) => {
        const customerPurchase = await CustomerBookRecord.getAllByCustomerId(req.params.id);
        res.json(customerPurchase);
    })

    .post('/',async (req,res) => {
        const customer = new CustomerRecord(req.body);
        await customer.insert();
        res.json(customer);
    })