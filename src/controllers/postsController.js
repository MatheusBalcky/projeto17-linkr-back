import { db } from "../db/postgres.js";

export async function publishPost(req, res) {
    //const userId = res.locals.userId;
    const userId = 1;
    const {postUrl, postDescription} = req.body;

    try{
        const query = await db.query(`INSERT INTO posts ("url","text","userId") VALUES ($1,$2,$3)`,[postUrl, postDescription, userId]);
        res.sendStatus(201);
        return;
    }
    catch(error) {
        res.status(404).send(error);
        return;
    }
}