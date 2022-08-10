import userRepository from "../repositories/userRepository.js";

export async function signUp(req, res){
    const user = req.body;
    const { email, password, username, pictureUrl } = user;

    try{
        const result = await userRepository.getUserByEmail(email);
        if(result.rowCount > 0){
            return res.sendStatus(409);//Conflict
        }

        await userRepository.createUser(email, password, username, pictureUrl);

        res.sendStatus(201);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}