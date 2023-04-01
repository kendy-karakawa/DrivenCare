import errors from "../errors/index.js";
import userRepositories from "../repositores/userRepositories.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function authValidation(req, res, next){
    const {authorization} = req.headers;
    if(!authorization) throw errors.unauthorized();

    const parts = authorization.split(" ")
    if (parts.length !==2 ) throw errors.unauthorized()

    const [schema, token] = parts
    if (schema !== "Bearer") throw errors.unauthorized()

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded)=>{
        try {
            if (error) throw errors.unauthorized()

            const {rows: [user]} = await userRepositories.findById(decoded.id)
            
            if(!user) throw errors.unauthorized()

            res.locals.user = user

            next()
        } catch (err) {
            next(err)
        }
    })
}