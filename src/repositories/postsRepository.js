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

async function getPosts() {
    return db.query(`
    SELECT 
        p.id AS id, 
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
        20`);
}

export const postsRepository = {
    submitPost,
    getPosts
};