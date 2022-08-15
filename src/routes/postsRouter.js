import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMW.js";
import authenticationMW from "../middlewares/authenticationMW.js";
import { postSchema } from "../schemas/postSchemas.js";
import { publishPost, getPosts } from "../controllers/postsController.js";
import metadataScraperMW from "../middlewares/metadataScraperMW.js";

const postsRouter = Router();

postsRouter.post('/publish', validateSchema(postSchema), authenticationMW, metadataScraperMW, publishPost);
postsRouter.get('/feed', getPosts);

export default postsRouter;