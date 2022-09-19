import {Router} from "express";
import {CustomerRecord} from "../records/customer.record";

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

    .post('/',async (req,res) => {
        const customer = new CustomerRecord(req.body);
        await customer.insert();
        res.json(customer);
    })