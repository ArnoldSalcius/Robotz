const jwt = require('jsonwebtoken');


const generateToken = (data) => {
    console.log(process.env.JWT_EXPIRY);
    return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRY) });
}

const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        console.log(err);
        if (err) return null;
        return user;
    })
}


module.exports = {
    verifyToken,
    generateToken
}