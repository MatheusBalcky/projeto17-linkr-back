import userRepository from "../repositories/userRepository.js";


export async function searchUsers(req, res) {
    const searchTerm = req.params.searchTerm;

    try{
        const query = await userRepository.getUsersThatMatch(searchTerm);
        return res.status(200).send(query.rows);
    }
    catch(error) {
        return res.status(500).send("Ocorreu um erro ao realizar a pesquisa");
    }
}