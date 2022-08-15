import hashtagsRepo  from "../repositories/hashtagsRepo.js";

export async function getHashtags (req, res){
    try {

        const trendingList = await hashtagsRepo.findTrendingHashtags();
        res.status(200).send(trendingList);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getPostsByHashtag (req, res){
    const { hashtag } = req.params;
    
    try {
        const result = await hashtagsRepo.findHashtagByName(hashtag);

        if(result.length < 1){
            return res.sendStatus(404);
        }

        const posts = await hashtagsRepo.findPostsByHashtag(result[0].id);

        //console.table(posts)

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    
}