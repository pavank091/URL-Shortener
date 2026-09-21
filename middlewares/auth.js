const { getUser } = require("../service/auth");


async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.headers["authorization"];
    // userUid = [Bearer 23ul1232ukhdigjdh]

    if (!userUid) return res.redirect("/login");
    const token = userUid.split(" ")[1]; // [23ul1232ukhdigjdh]

    const user = getUser(token);

    console.log("DECODED USER:", user);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    console.log(req.headers);
    const userUid = req.headers["authorization"];
    
    // userUid = [Bearer 23ul1232ukhdigjdh]
    if(!userUid) return res.json({ "error": "Credentials are invalid"});
    const token = userUid.split(" ")[1]; // [23ul1232ukhdigjdh]

    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}; 