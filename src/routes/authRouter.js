import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMW.js";
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import { loginController, verifyTokenRoute, signUp } from "../controllers/authController.js";
import { loginMW } from "../middlewares/authMW.js";

const authRouter = Router();

authRouter.post('/verifytoken', verifyTokenRoute);
authRouter.post('/signin', validateSchema(signInSchema), loginMW, loginController);
authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);



export default authRouter;