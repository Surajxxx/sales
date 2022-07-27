import { IRequest, IResponse, INext} from "../interfaces/vendors";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import Locals from "../config/config";


export const authentication = async (req: any, res: IResponse, next : INext) => {

    let token = req.headers["authorization"]
    if(!token || token.split(" ")[0] !== 'Bearer') {
        return res.status(401).send({ message : "Token is required...please login first." });
    }

    token = token.split(" ")[1];

    try {
        const decoded = await jwt.verify(token, Locals.config().jwtSecret);
        req.decoded = decoded
        return next()
    } catch (error : any) {
        return new createHttpError.Unauthorized(error.message);
    }

}

// export const roleConfirmation = async (req: any, res: IResponse, next : INext) => {
//     const payload = req.decoded;
//     if(payload.role === "admin") {

//     }
// }