const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];


    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(err.message);
        }
        req.user = { user: decoded.user, id: decoded.id };
        console.log('You have passed auth with ', req.user);
        next();
    });

}



module.exports = {
    auth
}