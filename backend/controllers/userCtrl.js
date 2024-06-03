const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

exports.signup = (req, res, next) => {
  console.log('signup route called');

  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          console.log('User created : ', user);
          res.setHeader('Content-Type', 'application/json');
          res.status(201).json({ message: 'User created' });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        return res.status(401).json({ message: 'Email or password invalid' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Email or password invalid' });
          } else {
            console.log('User Loged : ', user);
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              {
                expiresIn: '24h',
              }
            );

            res.cookie('token', token, {
              sameSite: 'strict',
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
              userId: user._id,
              token: token,
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};
