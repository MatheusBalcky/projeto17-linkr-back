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

const hashtagsRepo = {
    findHashtags
}

export default hashtagsRepo;