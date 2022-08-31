import {Router} from "express";
import {CustomerRecord} from "../records/customer.record";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/handleErrors";
import {v4 as uuid} from "uuid";
import {hashPassword} from "../utils/bcrypt-functions";

export const registrationRouter = Router()

    .post('/customer', async (req, res) => {


        if (req.body.password !== req.body.confirmPassword) {
            throw new ValidationError('Niepoprawne dane!');
        }

        if (req.body.password.length < 8) {
            throw new ValidationError('Hasło powinno zawierać minimum 8 znaków.');
        }

        if (!req.body.email) {
            throw new ValidationError('Email jest wymagany!');
        }
        if (await UserRecord.getOneByEmail(req.body.email)) {
            throw new ValidationError('Użytkownik o takim emailu juz istnieje!');
        }
        if (!req.body.fullName) {
            throw new ValidationError('Nie podano wszystkich informacji!');
        };

        const hash = hashPassword(req.body.password);

        const user = {
            email: req.body.email,
            password: hash,
            role: 'customer',
        };
        const addUser = new UserRecord(user);
        const tokenRegister = await addUser.insert();

        const customer = {
            userId: addUser.id,
            fullName: req.body.fullName,
            email: req.body.email,
        };


        const addCustomer = new CustomerRecord(customer);
        console.log('addCustomer', addCustomer);
        try {
            await addCustomer.insert();

        } catch (err) {
            console.log(err);
        }
        res.json('Dodano Customer do bazy danych.');
    });