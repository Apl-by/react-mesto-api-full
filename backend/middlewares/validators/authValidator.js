const { celebrate, Joi } = require('celebrate');

const authValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

module.exports = authValidator;
