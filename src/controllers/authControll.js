import { createToken, verifyToken } from '../services/jwt.js';
import userRepository from "../repositories/userRepository.js";

export async function verifyTokenRoute (req,res){
    const { tokenToVerify } = req.body;
    const result = verifyToken(tokenToVerify);
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

export async function signUp(req, res){
    const user = req.body;
    const { email, password, username, pictureUrl } = user;

    try{
        const resultEmail = await userRepository.getUserByEmail(email);
        if(resultEmail.rowCount > 0){
            return res.status(409).send('Email already exists');//Conflict
        }

        //!Colocar uma condição dps para ñ deixar cadastrar username iguais independete de lower ou upper case
        const resultUsername = await userRepository.getUserByUsername(username);
        if(resultUsername.rowCount > 0){
            return res.status(409).send('Username already exists');//Conflict
        }

        await userRepository.createUser(email, password, username, pictureUrl);

        res.sendStatus(201);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}