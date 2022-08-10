import { db } from '../db/postgres.js'
import bcrypt from 'bcrypt';

export async function loginMW (req, res, next){
    const { email, password } = req.body;

    try {

        const { rows: verifyEmail } = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if(verifyEmail.length < 1){
            return res.sendStatus(401)
        }

        const verifyPassword = bcrypt.compareSync(password, verifyEmail[0].password);
        if(!verifyPassword){
            return res.sendStatus(401);
        }

        res.locals.user = {
            id: verifyEmail[0].id,
            username: verifyEmail[0].username,
            email: verifyEmail[0].email,
            pictureUrl: verifyEmail[0].pictureUrl
        };

        next()
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}