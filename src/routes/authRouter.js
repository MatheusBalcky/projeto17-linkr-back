import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMW.js";
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import { signIn, verifyTokenRoute, signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/verifytoken', verifyTokenRoute);
authRouter.post('/signin', validateSchema(signInSchema), signIn);
authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);



export default authRouter;