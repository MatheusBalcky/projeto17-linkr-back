import { createToken, verifyToken } from '../services/jwt.js';
import userRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';

export async function verifyTokenRoute (req,res){
    const { tokenToVerify } = req.body;
    const result = verifyToken(tokenToVerify);
    if(!result){
        return res.sendStatus(401);
    }
    
    const userData = await userRepository.findUserById(result.userId);
    delete userData.password;

    return res.status(200).send(userData);
}

export async function signIn (req,res){
    const authUser = req.body;
    
    try {
        const query = await userRepository.getUserByEmail(authUser.email);
        
        if(query.rowCount === 0) {
            return res.sendStatus(401);
        }

        if(!bcrypt.compareSync(authUser.password, query.rows[0].password)) {
            return res.status(401).send("Senha incorreta!");
        }

        const session = await userRepository.createSession(query.rows[0].id);

        const token = createToken({
            userId: query.rows[0].id,
            username: query.rows[0].username
        });
        
        const userData = query.rows[0];
        delete userData.password

        res.status(200).send({
                ...userData,
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