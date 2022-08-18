import { db } from "../db/postgres.js";

async function getCommentsFromPost(postId) {
    return db.query(`
    SELECT
        c.id AS id,
        u.id AS "userId",
        u.username AS username,
        u."pictureUrl" AS "userPictureUrl",
        c.text AS text,
    FROM
        comments c
        JOIN users u ON u.id = c."userId"
    WHERE
        c."postId" = $1 
    ORDER BY
        "createdAt" ASC`, [postId]);
}

export const commentsRepository = {
    getCommentsFromPost
};