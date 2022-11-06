const jwt = require("jsonwebtoken");
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies["jwt-token"], process.env.FIRST_SECRET_KEY, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            req.userId = payload.id;
            //req.userId is the users ObjectID returned from jwt-token (created at login) without scrambled key
            next();
        }
    });
};