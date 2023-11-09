const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/_models');
const auth = require('../middlewares/authorization.js');


router.post('/register', function (req, res, next) {

  const data = { username, email, password } = req.body;

  User.create(data)
    .then(() => {
      res.redirect(307, '/user/login');
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });

});


router.post('/login', function (req, res, next) {

  //identifier can be username or email, so the user can connect using both
  const identifier = req.body.identifier ? req.body.identifier : req.body.email;
  const password = req.body.password;

  User.findOne(
    {
      where: {
        [Op.or]: [
          { email: identifier },
          { username: identifier }
        ]
      }
    }
  ).then(user => {

    if (!user) {
      res.json('false');
    } else {

      const secret = process.env.JWT_SECRET;

      bcrypt.compare(password, user.password).then(isOk => {
        if (!isOk) {
          res.json('false');
        } else {
          res.json({
            "token": JWT.sign({ id: user.id }, secret, { expiresIn: '1d' }),
          });
        }
      })
    }

  }).catch((error) => {
    res.status(500);
    res.json('error on login: ' + error);
  });
});


router.use(auth); //Everything benith this route will be protected by the auth middleware


router.get('/', function (req, res, next) {
  res.json(req.user);
});


router.patch('/', function (req, res, next) {

  res.json(req.user);
  const data = { username, email, password } = req.body;

  User.update(data, {
    where: {
      id: req.user.id
    }
  }).then(() => {
    res.json('User updated');
  }).catch((error) => {
    res.status(500);
    res.json('error on updating user: ' + error);
  });

});

module.exports = router;
