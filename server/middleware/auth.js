const jwtService = require('../utils/jwt');

const auth = async (req, res, next) => {
    const token = req.headers['authorization'];
    const verified = await jwtService.verifyToken(token);

    if (verified) {
        console.log(verified);
        req.user = verified.username;
        return next();
    }

    next('token dont work');

}



module.exports = {
    auth
}