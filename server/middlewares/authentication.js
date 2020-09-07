const jwt = require('jsonwebtoken');

// verify token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403);

        req.user = decoded.user;
        next();
    });

}

module.exports = {
    authenticateToken
};
