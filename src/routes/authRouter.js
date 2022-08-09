import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema } from "../schemas/authSchemas.js";
import { loginControll, verifyTokenRoute } from "../controllers/authControll.js";
import { loginMW } from "../middlewares/authMW.js";

const authRouter = Router();

authRouter.post('/signin', validateSchema(loginSchema), loginMW, loginControll);
authRouter.post('/verifytoken', verifyTokenRoute);




export default authRouter;