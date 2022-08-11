import bcrypt from "bcrypt";
import { db } from "../db/postgres.js";

export async function findUserById (userId){
    const { rows: findingUser } = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return findingUser[0];
}

async function getUserByEmail(email){
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
}

async function getUserByUsername(username){
    return db.query("SELECT * FROM users WHERE username = $1", [username]);
}

async function createUser(email, password, username, pictureUrl){
    const passwordHash = bcrypt.hashSync(password, 10);

    return(
        db.query(`
            INSERT INTO users (email, password, username, "pictureUrl")
            VALUES ($1, $2, $3, $4)
        `, [email, passwordHash, username, pictureUrl])
    );
}

const userRepository = {
    getUserByEmail,
    getUserByUsername,
    findUserById,
    createUser
};

export default userRepository;