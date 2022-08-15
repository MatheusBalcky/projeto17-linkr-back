import { postsRepository } from "../repositories/postsRepository.js";

export async function publishPost(req, res) {
    const userId = res.locals.userId;
    const {postUrl, postDescription} = req.body;

    try {
        const query = await postsRepository.submitPost(postUrl, postDescription, userId);
        res.sendStatus(201);
        return;
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function getPosts(req, res) {
    try {
        const query = await postsRepository.getPosts();
        res.status(200).send(query.rows);
        return;
    }
    catch(error) {
        res.status(500).send("Ocorreu um erro");
        return;
    }
}