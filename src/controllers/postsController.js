import { postsRepository } from "../repositories/postsRepository.js";
import hashtagsRepo from "../repositories/hashtagsRepo.js";

export async function publishPost(req, res) {
    const {userId, urlTitle, urlThumbnail, urlDescription} = res.locals;
    const {postUrl, postDescription, hashtags} = req.body;
    // console.log({
    //     userId,
    //     urlTitle,
    //     urlThumbnail,
    //     urlDescription,
    //     postUrl,
    //     postDescription
    // });

    try {
        const { rows: queryReturning} = await postsRepository.submitPost(postUrl, urlTitle, urlThumbnail, urlDescription, postDescription, userId);
        const postId = queryReturning[0].id;

        if(hashtags.length > 0){
            hashtags.forEach(async nameHashtag => {

                const hashtag = await hashtagsRepo.findHashtagByName(nameHashtag);

                if(hashtag.length > 0){
                    hashtagsRepo.insertPostWithHashtag(postId, hashtag[0].id)
                }

                else {
                    const queryReturning = await hashtagsRepo.insertNewHashtag(nameHashtag)
                    const hashtagId = queryReturning[0].id;
                    hashtagsRepo.insertPostWithHashtag(postId, hashtagId);
                }
            });
        }

        return res.sendStatus(201);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getPosts(req, res) {
    try {
        const query = await postsRepository.getPosts();
        return res.status(200).send(query.rows);
    }
    catch(error) {
        return res.status(500).send("Ocorreu um erro");
    }
}