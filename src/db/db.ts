import mongoose from "mongoose";
import Locals from "../config/config";
import logger from '../logger/logger'

/*
* @author Suraj Dubey
* @description Database configuration
*/
class Database {
    // Initialize the database connection
    public static async init () : Promise<any> {
        const dsn : string = Locals.config().mongooseUrl

        try {
            await mongoose.connect(dsn)
            logger.info("Database initialized successfully");
        } catch (error : any) {
            logger.info("Database connection error: " + error.message);
        }
     
}}

export default Database;