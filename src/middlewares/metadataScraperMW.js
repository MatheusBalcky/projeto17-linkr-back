import urlMetadata from "url-metadata";

export default async function metadataScraperMW(req, res, next) {
    const {postUrl} = req.body;

    try {
        const promise = await urlMetadata(postUrl);
        res.locals.urlTitle = promise.title;
        res.locals.urlThumbnail = promise.image;
        res.locals.urlDescription = promise.description;

        next();
    }
    catch(error) {
        console.log(error);
        next();
    }
}