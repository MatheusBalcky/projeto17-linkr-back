import { db } from "../db/postgres.js";

async function findTrendingHashtags () {
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

async function findHashtagByName (hashtagName){
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

async function insertPostWithHashtag (postId, hashtagId){
    const { rows: result } = await db.query(`
        INSERT INTO "hashtagsPosts" ("postId", "hashtagId")
        VALUES ($1, $2)`, [postId, hashtagId]);
    return result
}

async function insertNewHashtag (hashtagName){
    const {rows: result} = await db.query(`
    INSERT INTO hashtags (name)
    VALUES ($1) RETURNING id`,[hashtagName]);
    return result;
}



const hashtagsRepo = {
    findTrendingHashtags,
    findHashtagByName,
    findPostsByHashtag,
    insertPostWithHashtag,
    insertNewHashtag
}

export default hashtagsRepo;