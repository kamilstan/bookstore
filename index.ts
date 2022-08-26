import express, { Router } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import { handleError } from './utils/handleErrors';
import {bookRouter} from "./routers/book.router";
import morgan = require("morgan");


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(morgan('common'));
app.use(
    rateLimiter({
        windowMs: 5 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

//routers
const router = Router();

router.use('/book', bookRouter);

app.use('/api', router);

app.use(handleError);

app.listen(8080, 'localhost', () => {
    console.log(`Server is running: http://localhost:8080`);
});
