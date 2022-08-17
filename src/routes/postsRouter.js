import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMW.js";
import authenticationMW from "../middlewares/authenticationMW.js";
import { postSchema } from "../schemas/postSchemas.js";
import { publishPost, getPosts, deletePost, updateTextPost } from "../controllers/postsController.js";
import metadataScraperMW from "../middlewares/metadataScraperMW.js";
import validateToken from "../middlewares/authenticationMW.js";

const postsRouter = Router();

postsRouter.post('/publish', validateSchema(postSchema), authenticationMW, metadataScraperMW, publishPost);
postsRouter.get('/feed', getPosts);
postsRouter.delete('/delete/:id', validateToken, deletePost);
postsRouter.patch('/post/:id', validateToken, updateTextPost);

export default postsRouter;