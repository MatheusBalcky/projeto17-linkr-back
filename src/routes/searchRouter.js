import { Router } from "express";
import { searchUsers } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.get('/search/:searchTerm', searchUsers);

export default searchRouter;