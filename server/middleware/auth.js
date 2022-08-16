const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');

const auth = (req, res, next) => {

    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split('Bearer ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: { message: 'Invalid, expired or missing session. Please re-login.' } });
                // Fix this to work with handler and call next
                // return next(new ErrorResponse('Invalid, expired or missing session. Please re-login.', 401));
            }

            ///remove this
            req.user = { user: decoded.username, id: decoded.id };

            next();

        });
    } else {
        return res.status(401).send({ error: { message: 'Invalid, expired or missing session. Please re-login.' } })
    }
}



module.exports = {
    auth
}