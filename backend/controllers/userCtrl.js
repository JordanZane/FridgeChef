const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const FavoriteRecipe = require('../models/FavoriteRecipeModel');

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
          if (error.code === 11000) {
            return res
              .status(400)
              .json({ message: 'Email already registered' });
          }
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

exports.getUserInfos = (req, res) => {
  console.log('Get user infos route called');
  const userId = req.user.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      res.status(200).json({ user });
      console.log('User infos getted', user);
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log('Error : ', error);
    });
};

exports.modifyPassword = (req, res, next) => {
  console.log('reset-pw called backend', req.body);
  const userId = req.user.userId;
  console.log(userId);
  const { password, newPassword } = req.body;
  User.findOne({ _id: userId })
    .then((user) => {
      console.log('User found:', user);
      bcrypt.compare(password, user.password).then((isPasswordValid) => {
        if (!isPasswordValid) {
          console.log('Invalid password');
          return res.status(401).json({ message: 'Invalid password' });
        } else {
          bcrypt.hash(newPassword, 10).then((hashedNewPassword) => {
            user.password = hashedNewPassword;
            user.save().then(() => {
              console.log('Password modify successfully');
              res.status(200).json({ message: 'Password modify successfully' });
            });
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteAccount = async (req, res, next) => {
  console.log('Delete account route called');
  const userId = req.user.userId;
  const { password } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid password' });
    }

    const favoriteRecipes = await FavoriteRecipe.find({ userId });
    console.log(favoriteRecipes);
    for (const recipe of favoriteRecipes) {
      await recipe.deleteOne();
    }
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Account deleted successfully' });
    console.log('Account deleted successfully');
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'An error occurred while deleting account' });
  }
};

exports.resetPassword = (req, res, next) => {
  console.log('Reset password route called');

  const { userId } = req.params;
  const { newPassword } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        console.log('User not found : ', user);
        return res.status(404).json({ message: 'User not found' });
      }

      return bcrypt
        .hash(newPassword, 10)
        .then((hashedPassword) => {
          user.password = hashedPassword;
          return user.save();
        })
        .then(() => {
          console.log('Password reset successfully');
          res.status(200).json({ message: 'Password reset successfully' });
        });
    })
    .catch((error) => {
      console.error('Error processing password reset:', error);
      res
        .status(500)
        .json({ message: 'An error occurred while resetting the password' });
    });
};
