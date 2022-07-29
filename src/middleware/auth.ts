import { IRequest, IResponse, INext} from "../interfaces/vendors";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import Locals from "../config/config";


export const authentication = async (req: any, res: IResponse, next : INext) => {

    console.log("decoded");
    try {
    let token = req.headers["authorization"];

    if(!token || token.split(" ")[0] !== 'Bearer') {
       throw new createHttpError.Unauthorized( "Token is required...please login first." );
    }

    token = token.split(" ")[1];

        const decoded  = await jwt.verify(token, Locals.config().jwtSecret);

        req.decoded = decoded
         next()
    } catch (error : any) {
        // return new createHttpError.Unauthorized(error.message);
        // error.status = 401;
        next(error)
    }

}
