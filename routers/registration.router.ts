import {Router} from "express";
import {CustomerRecord} from "../records/customer.record";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/handleErrors";

export const registrationRouter = Router()

    .post('/registration/customer', async (req, res) => {
        const user = {
            email: req.body.email,
            role: 'customer',
        };

        if (!user.email) {
            throw new ValidationError('Email jest wymagany!');
        }
        if (await UserRecord.getOneByEmail(req.body.email)) {
            throw new ValidationError('Użytkownik o takim emailu juz istnieje!');
        }
        const addUser = new UserRecord(user);
        const tokenRegister = await addUser.insert();
        console.log('tokenRegister', tokenRegister);
        console.log('addUser', addUser);

        if (!req.body.fullName) {
            throw new ValidationError('Nie podano wszystkich informacji!');
        }

        const customer = {
            ...req.body,
            userId: addUser.id,
        };


        const addCustomer = new CustomerRecord(customer);

        try {
            await addCustomer.insert();

        } catch (err) {
            console.log(err);
        }
        res.json('Dodano Customer do bazy danych.');
    });