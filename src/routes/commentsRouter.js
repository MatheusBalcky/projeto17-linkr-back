import { Router } from "express";
import { getCommentsFromPost } from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.get('/comments/:postId', getCommentsFromPost);

export default commentsRouter;