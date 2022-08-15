import { Router } from "express";
import { getPostsByHashtag, getHashtags } from "../controllers/hashtagControll.js";


const hashtagRouter = Router();

hashtagRouter.get('/hashtags', getHashtags);
hashtagRouter.get('/hashtag/:hashtag', getPostsByHashtag);


export default hashtagRouter;