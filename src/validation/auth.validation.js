const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().trim(),
  email: Joi.string().min(3).max(255).required().trim().lowercase().email(),
  password: Joi.string().min(3).max(1024).required(),
  password2: Joi.string().min(3).max(1024).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(3).max(255).required().trim().lowercase().email(),
  password: Joi.string().min(3).max(1024).required(),
});

module.exports = { registerSchema, loginSchema };
