import hashtagsRepo  from "../repositories/hashtagsRepo.js";

export async function getHashtags (req, res){
    try {

        const trendingList = await hashtagsRepo.findHashtags();
        res.status(200).send(trendingList);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);
        
    }
}

export async function getPostsByHashtag (req, res){
    const { hashtag } = req.params;
    
    try {
        
    } catch (error) {
        
    }

    res.sendStatus(200);
}