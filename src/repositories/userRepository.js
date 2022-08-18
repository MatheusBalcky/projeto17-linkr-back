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

async function getUsersThatMatch(pattern){
    return db.query(`
    SELECT
        u.id AS id,
        u.username AS username,
        u."pictureUrl" AS "pictureUrl"
    FROM
        users u
    WHERE
			u.username ILIKE $1
    `, [`%${pattern}%`]);
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

async function createSession(userId){
    return(
        db.query(`INSERT INTO sessions ("userId") VALUES ($1)`,[userId])
    );
}

const userRepository = {
    getUserByEmail,
    getUserByUsername,
    findUserById,
    getUsersThatMatch,
    createUser,
    createSession
};

export default userRepository;