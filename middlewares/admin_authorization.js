
function authenticationMiddleware(req, res, next) {

    if (req.user.role !== 'admin') {
        return res.status(401).json("Access denied");
    } else {
        next();
    }
}

module.exports = authenticationMiddleware;