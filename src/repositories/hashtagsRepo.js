import { db } from "../db/postgres.js";

async function findHashtags () {
    const {rows: result} = await db.query(`
        SELECT "hashtagId", hashtags.name, COUNT("hashtagId") as "postsAmount"
        FROM "hashtagsPosts"
        JOIN hashtags
        ON hashtags.id = "hashtagsPosts"."hashtagId"
        GROUP BY "hashtagId", hashtags.name
        ORDER BY "postsAmount" DESC
        LIMIT 10
    `);
    return result
}

async function findHashtagId (hashtagName){
    const {rows: result} = await db.query(`
        SELECT id FROM hashtags WHERE hashtags.name = $1
        `,[hashtagName]);
    return result
}

async function findPostsByHashtag (hashtagId){
    const { rows: result } = await db.query(`
        SELECT posts.*,
        json_build_object 
            ('id', users.id,
            'username', users.username,
            'pictureUrl', users."pictureUrl") as "user"
        FROM posts
        JOIN "hashtagsPosts"
        ON "hashtagsPosts"."postId" = posts.id
        JOIN users ON posts."userId" = users.id
        WHERE "hashtagsPosts"."hashtagId" = $1`, [hashtagId]);
    return result
}




const hashtagsRepo = {
    findHashtags,
    findHashtagId,
    findPostsByHashtag
}

export default hashtagsRepo;