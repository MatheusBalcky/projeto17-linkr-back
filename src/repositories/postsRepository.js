import { db } from "../db/postgres.js";

async function publishPost(postUrl, postDescription, userId) {
    return db.query(`
    INSERT INTO posts ("url", "text", "userId") 
    VALUES 
      ($1, $2, $3)`,
      [postUrl, postDescription, userId]);

}

async function getPosts() {
    return db.query(`
    SELECT 
        p.id AS id, 
        u.username AS username, 
        u."pictureUrl" AS "userPictureUrl", 
        p.url AS url, 
        p.text AS text, 
        p."createdAt" AS "createdAt" 
    FROM 
        posts p 
        JOIN users u ON u.id = p."userId" 
    ORDER BY 
        "createdAt" DESC 
    LIMIT 
        20`);
}

export const postsRepository = {
    publishPost,
    getPosts
};