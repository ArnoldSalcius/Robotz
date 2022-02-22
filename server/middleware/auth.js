const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];


    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid, expired or missing session' })
        }
        req.user = { user: decoded.user, id: decoded.id };
        console.log('You have passed auth with ', req.user);
        next();
    });

}



module.exports = {
    auth
}