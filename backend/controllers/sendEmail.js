const nodemailer = require('nodemailer');
const path = require('path');
const validator = require('validator');
const User = require('../models/UserModel');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Email = process.env.IONOS_EMAIL;
const EmailPassword = process.env.IONOS_PASSWORD;
const smtpServer = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;

exports.sendEmail = async (req, res) => {
  console.log('Send email route called');
  const { email, message } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Adresse email invalide' });
  }

  if (validator.isEmpty(message) || typeof message !== 'string') {
    return res
      .status(400)
      .json({ message: 'Le message ne peut pas être vide' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: smtpPort,
      secure: true,
      auth: {
        user: Email,
        pass: EmailPassword,
      },
    });

    const mailOptions = {
      from: Email,
      to: Email,
      subject: 'FridgeChef : Nouveau message de contact',
      text: `De : ${email}\n\nMessage : ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.response);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.log("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
};

exports.sendEmailPassword = async (req, res, next) => {
  console.log('Send email for reseting password route called');
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Adresse email invalide' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}`;
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: smtpPort,
      secure: true,
      auth: {
        user: Email,
        pass: EmailPassword,
      },
    });

    const mailOptions = {
      from: Email,
      to: user.email,
      subject: 'FridgeChef : Reset your password',
      text: `Click on the click to reset your password : ${resetLink}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email send :', info.response);
    res.status(200).json({ message: 'Email send successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error when sending email' });
    console.log('Error when sending email to reset password :', error);
  }
};
