import { Router } from "express";
import { getCommentsFromPost, publishComment } from "../controllers/commentsController.js";
import authenticationMW from "../middlewares/authenticationMW.js";
const commentsRouter = Router();

commentsRouter.get('/comments/:postId', getCommentsFromPost);
commentsRouter.post('/publishcomment', authenticationMW, publishComment);

export default commentsRouter;