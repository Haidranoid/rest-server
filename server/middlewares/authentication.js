const jwt = require('jsonwebtoken');

// verify token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ok:false,message:"There is any token"});

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ok:false,message:"Token is not valid"});

        req.user = decoded.user;
        next();
    });
}

function authenticateAdminRole(req, res, next) {
    const user = req.user;
    if (user.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ok:false,message:"Insufficient Permissions"});
    } else {
        next();
    }
}

module.exports = {
    authenticateToken,
    authenticateAdminRole,
};
