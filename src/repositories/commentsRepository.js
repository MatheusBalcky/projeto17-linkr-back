import { db } from "../db/postgres.js";

async function getCommentsFromPost(postId) {
    return db.query(`
    SELECT
        c.id AS id,
        u.id AS "userId",
        u.username AS username,
        u."pictureUrl" AS "userPictureUrl",
        c.text AS text
    FROM
        comments c
        JOIN users u ON u.id = c."userId"
    WHERE
        c."postId" = $1 
    ORDER BY
        c."createdAt" ASC`, [postId]);
}

async function submitComment(postId, userId, text) {
    return db.query(`
    INSERT INTO comments (
        "postId", "userId", "text"
    )
    VALUES
        ($1, $2, $3)`, [postId, userId, text]);
}

export const commentsRepository = {
    getCommentsFromPost,
    submitComment
};