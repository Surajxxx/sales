
/*
* @author Suraj Dubey
* @description config file for the application
*/

class Locals {
    public static config(): any {
       const port : number = parseInt(process.env.PORT as string) || 8000;
       const secret : string = process.env.SECRET as string || "geekyAnts";
       const mongooseUrl : string = process.env.MONGODB_URL as string || "mongodb+srv://surajxxx:MetEma4V1FgQslG7@cluster0.ik33b.mongodb.net/Sales-DB?retryWrites=true&w=majority";
       const ttl : number = parseInt(process.env.TTL as string) || 172800;
       const jwtExpiration : number = parseInt(process.env.JWT_EXPIRATION as string) || 3600;
       const jwtSecret : string = process.env.JWT_SECRET as string || "qwerty123";

       return {
        port,
        secret,
        mongooseUrl,
        ttl,
        jwtExpiration,
        jwtSecret};
    };

}

export default Locals;
