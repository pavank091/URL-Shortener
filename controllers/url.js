const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
    // client send original url(body.url)
    const body = req.body;
    // 400(bad request) - url is not existed
    // if url is existed but not found then 404
    if(!body.url) return res.status(400).json({ error: 'url is required'})

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL:  body.url,
        visitHistory: [],
    });

    return res.status(201).json({ id: shortID});
};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
     });
};

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};