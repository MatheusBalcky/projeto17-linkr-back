import { Router } from "express";

const router = Router();








router.use('/test', (req, res) => {
    res.status(200).send('Sounds good!')
});


export default router;