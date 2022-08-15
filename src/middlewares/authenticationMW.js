import { verifyToken } from '../services/jwt.js';

export default async function validateToken(req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).send("Token não foi enviado!");
    }

    try{
        const verification = await verifyToken(token);
        res.locals.userId = verification.userId;
        next();
    }
    catch(error) {
        return res.status(401).send(error);
    }
}