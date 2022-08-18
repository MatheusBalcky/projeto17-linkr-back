import { db } from "../db/postgres.js";

async function submitPost(postUrl, urlTitle, urlThumbnail, urlDescription, postDescription, userId) {
    return db.query(`
    INSERT INTO posts (
        "url", "urlTitle", "urlThumbnail", 
        "urlDescription", "text", "userId"
      ) 
      VALUES 
        ($1, $2, $3, $4, $5, $6)
    RETURNING id`,
      [postUrl, urlTitle, urlThumbnail, urlDescription, postDescription, userId]);

}

async function getPosts(limit) {
    return db.query(`
    SELECT 
        p.id AS id,
        u.id AS userId,
        u.username AS username, 
        u."pictureUrl" AS "userPictureUrl",
        p."urlTitle" AS "urlTitle",
        p."urlThumbnail" AS "urlThumbnail",
        p."urlDescription" AS "urlDescription",
        p.url AS url, 
        p.text AS text, 
        p."createdAt" AS "createdAt" 
    FROM 
        posts p 
        JOIN users u ON u.id = p."userId" 
    ORDER BY 
        "createdAt" DESC 
    LIMIT 
        $1`, [limit]);
}

async function getPostsFromUser(id) {
    return db.query(`
    SELECT 
        p.id AS id,
        u.id AS userId,
        u.username AS username, 
        u."pictureUrl" AS "userPictureUrl",
        p."urlTitle" AS "urlTitle",
        p."urlThumbnail" AS "urlThumbnail",
        p."urlDescription" AS "urlDescription",
        p.url AS url, 
        p.text AS text, 
        p."createdAt" AS "createdAt" 
    FROM 
        posts p 
        JOIN users u ON u.id = p."userId"
    WHERE
        u.id = $1
    ORDER BY 
        "createdAt" DESC 
    LIMIT 
        20`, [id]);
}

export async function updateTextPost (postId, newText){
    await db.query(`DELETE FROM "hashtagsPosts" WHERE "postId" = $1`, [postId]);
    await db.query(`UPDATE posts SET text = $1 WHERE id = $2`, [newText, postId])
}

export async function deletePostQuery (postId){
    await db.query(`DELETE FROM "hashtagsPosts" WHERE "postId" = $1`,[postId]);
    await db.query(`DELETE FROM posts WHERE id = $1`, [postId]);
}

export const postsRepository = {
    submitPost,
    getPosts,
    getPostsFromUser,
    deletePostQuery,
    updateTextPost
};