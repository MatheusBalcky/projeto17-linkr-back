import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchemas.js";
import { publishPost, getPosts } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.post('/publish', validateSchema(postSchema), publishPost);
postsRouter.get('/feed', getPosts);

export default postsRouter;