import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/authSchemas.js";
import { loginController, verifyTokenRoute, signUp } from "../controllers/authController.js";
import { loginMW } from "../middlewares/authMW.js";

const authRouter = Router();

authRouter.post('/verifytoken', verifyTokenRoute);
authRouter.post('/signin', validateSchema(loginSchema), loginMW, loginController);
authRouter.post("/sign-up", validateSchema(userSchema), signUp);



export default authRouter;