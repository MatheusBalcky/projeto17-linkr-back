import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postsRouter.js";
import hashtagRouter from "./hashtagRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(hashtagRouter);





router.use('/test', (req, res) => {
    res.status(200).send('Sounds good!')
});


export default router;