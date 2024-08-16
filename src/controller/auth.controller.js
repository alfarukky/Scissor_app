const useServices = require('../services/auth.services');
const passport = require('passport');

const register = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;

    await useServices.register(name, email, password, password2);
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/');
  } catch (err) {
    console.log(`${err.message}`);
    req.flash('error_msg', `${err.message}`);
    res.redirect('/');
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res, next);
};

const logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You have been logout successfully');
    res.redirect('/');
  });
};

module.exports = { register, login, logout };
