const jwt = require('jsonwebtoken');
const User = require('../Models/Model');
const cookieParser = require("cookie-parser");


const Authenticate = async (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens:token": token });

        if (!rootUser) {
            throw new Error('User not found !');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        return next();

    } catch (error) {
        res.status(401).send('Unauthorized User');
        console.log(error);
    }
};

module.exports = Authenticate;