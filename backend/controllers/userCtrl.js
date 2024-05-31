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
