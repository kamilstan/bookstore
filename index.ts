import express, { Router } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';


const app = express();
const router = Router();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(
    rateLimiter({
        windowMs: 5 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

//routers

app.use('/api', router);

app.use(handleError);

app.listen(8080, 'localhost', () => {
    console.log(`Server is running: http://localhost:8080`);
});

