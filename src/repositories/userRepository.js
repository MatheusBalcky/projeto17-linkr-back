import { db } from '../db/postgres.js'

export async function findUserById (userId){
    const { rows: findingUser } = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return findingUser[0];
}


export const userRepos = {
    findUserById
}