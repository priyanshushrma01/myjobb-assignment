
const { render } = require("@react-email/render");
const React = require("react");
const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const OtpEmail = require("../emails/OtpEmail");
const ConfirmationEmail = require("../emails/ConfirmationEmail");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Log the rendered HTML to debug
    const htmlContent = await render(React.createElement(OtpEmail, { otp }));
    console.log('Rendered HTML:', htmlContent);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: "OTP sent" });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: "Email failed", error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const htmlContent = await render(React.createElement(ConfirmationEmail, { email }));
    console.log('Rendered HTML:', htmlContent);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Login Successful",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ message: "Verification failed", error: error.message });
  }
};