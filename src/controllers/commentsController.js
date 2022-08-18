import { commentsRepository } from "../repositories/commentsRepository.js";

export async function getCommentsFromPost(req, res) {
    const postId = req.params.postId;

    try{
        const query = await commentsRepository.getCommentsFromPost(postId);
        return res.status(200).send(query.rows);
    }
    catch(error) {
        return res.status(500).send("Ocorreu um erro");
    }
}

export async function publishComment(req, res) {
    const {userId} = res.locals;
    const {text, postId} = req.body;

    try{
        const query = await commentsRepository.submitComment(postId, userId, text);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.sendStatus(500);
    }
}