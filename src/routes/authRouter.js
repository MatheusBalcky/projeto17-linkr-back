import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema } from "../schemas/authSchemas.js";
import { loginControll, verifyTokenRoute } from "../controllers/authControll.js";
import { loginMW } from "../middlewares/authMW.js";
import { signUp } from "../controllers/authController.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post('/signin', validateSchema(loginSchema), loginMW, loginControll);
authRouter.post('/verifytoken', verifyTokenRoute);
authRouter.post("/sign-up", validateSchema(userSchema), signUp);





export default authRouter;