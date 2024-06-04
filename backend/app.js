const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const sendEmailRoute = require('./routes/sendEmail');
const signupUser = require('./routes/signup');
const loginUser = require('./routes/login');
const logoutUser = require('./routes/logout');
const addToFavorite = require('./routes/addToFavorite');
const checkIsFavorite = require('./routes/checkIsFavorite');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/send-email', sendEmailRoute);
app.use('/signup', signupUser);
app.use('/login', loginUser);
app.use('/logout', logoutUser);
app.use('/add-to-favorite', addToFavorite);
app.use('/check-favorite', checkIsFavorite);

module.exports = app;
