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

// dotenv configuration
dotenv.config()

// express app configuration
const app : Express = express();

const port : number = parseInt(process.env.PORT as string);


app.set('port', port);

// Implementing cors middleware
app.use(cors());

// Implementing helmet middleware
app.use(helmet());

// Implementing morgan middleware
app.use(morgan('dev'));

// Implementing express session middleware
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

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

// Database initialized
Database.init();

// diverting user request to user router
app.use('/user', userRouter)

// diverting checklist request to checklist router
app.use('/checklist', checklistRouter)

// diverting order request to order router
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

// not found handler
app.use((req, res, next) => {
    next( new createHttpError.NotFound())
}) 

export default app;