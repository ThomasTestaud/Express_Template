const JWT = require('jsonwebtoken');
const { User } = require('../models');

function authenticationMiddleware(req, res, next) {

    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json("Access denied");
    }

    token = token.split(" ");

    if (token.length !== 2) {
        return res.status(401).json("Access denied");
    }

    token = token[1];

    // Verify token and put the payload of it in the req.user
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {

        if (err !== null) {
            res.status(401);
            res.json("Access denied");
        }

        const id = Number(payload.id);

        User.findByPk(id).then(user => {

            console.log('User before deletion:', user);

            if (!user) {
                res.status(401);
                res.json("Access denied");
            }

            // Sequelize does this thing where it create a double object so I have to add .dataValues. in order for the delete to work
            delete user.dataValues.password;

            req.user = user;
            //res.json(user);
            next();

        }).catch(error => {
            res.status(500);
            res.send('Error on getting resource: ' + error);
        })

    })
}

module.exports = authenticationMiddleware;