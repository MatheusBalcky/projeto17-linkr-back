import { Router } from "express";
import authRouter from "./authRouter.js";

const router = Router();

router.use(authRouter);








router.use('/test', (req, res) => {
    res.status(200).send('Sounds good!')
});


export default router;