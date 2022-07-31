import express, {Express, Request, Response, NextFunction} from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import createHttpError from 'http-errors';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import locals from './config/config';
import Database from '../src/db/db';
import userRouter from './routes/userRoutes';
import checklistRouter from '../src/routes/checklistRoutes';
import orderRouter from '../src/routes/orderRoutes';
import multer from 'multer';

dotenv.config()

const app : Express = express();

const port : number = parseInt(process.env.PORT as string);

app.set('port', port);
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(session({
    secret : process.env.SECRET as string,
    resave: false as boolean,
    saveUninitialized: true as boolean,
    cookie : {
        maxAge: 2 * 24 * 60 * 60 * 1000,
    },
    store:  MongoStore.create({
        mongoUrl : process.env.MONGOOSE_URL,
        ttl: locals.config().ttl
    })
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

Database.init();



app.use('/user', userRouter)
app.use('/checklist', checklistRouter)
app.use('/order', orderRouter);

// error handler
app.use((err : any, req : Request, res : Response, next : NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

// not found 
app.use((req, res, next) => {
    next( new createHttpError.NotFound())
}) 

export default app;