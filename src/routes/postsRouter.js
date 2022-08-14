import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMW.js";
import authenticationMW from "../middlewares/authenticationMW.js";
import { postSchema } from "../schemas/postSchemas.js";
import { publishPost, getPosts } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.post('/publish', validateSchema(postSchema), authenticationMW, publishPost);
postsRouter.get('/feed', getPosts);

export default postsRouter;