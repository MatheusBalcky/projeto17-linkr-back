import { createToken, verifyToken } from '../services/jwt.js';
import { userRepos } from '../repositories/userRepository.js';


export async function verifyTokenRoute (req,res){
    const { token } = req.body;
    
    const result = verifyToken(token);
    if(!result){
        return res.sendStatus(401);
    }
    
    const userData = await userRepos.findUserById(result.idUser);
    delete userData.password;
    
    return res.status(200).send(userData);
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