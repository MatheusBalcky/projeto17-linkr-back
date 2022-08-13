import { db } from "../db/postgres.js";

export async function publishPost(req, res) {
    //const userId = res.locals.userId;
    const userId = 1;
    const {postUrl, postDescription} = req.body;

    try {
        const query = await db.query(`INSERT INTO posts ("url","text","userId") VALUES ($1,$2,$3)`,[postUrl, postDescription, userId]);
        res.sendStatus(201);
        return;
    }
    catch(error) {
        res.status(404).send(error);
        return;
    }
}

export async function getPosts(req, res) {
    try {
        const query = await db.query(`SELECT * FROM posts ORDER BY posts."createdAt" DESC LIMIT 20`);
        res.status(200).send(query.rows);
        return;
    }
    catch(error) {
        res.status(400).send("Ocorreu um erro");
        return;
    }
}