import { createToken } from '../services/jwt.js';
import { verifyToken } from '../services/jwt.js';

export async function verifyTokenRoute (req,res){
    const { token } = req.body;
    const result = verifyToken(token);
    if(!result){
        return res.sendStatus(401);
    }
    return res.sendStatus(200);
}

export async function loginControll (req,res){
    const { user } = res.locals;
    
    try {
        
        const token = createToken({ idUser: user.id});

        res.status(200).send({
            ...user,
            token
        });

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}