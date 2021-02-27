const { celebrate, Joi } = require('celebrate');

const registerValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().pattern(/^[^<>]{2,30}$/),
    about: Joi.string().pattern(/^[^<>]{2,30}$/),
    avatar: Joi.string().pattern(new RegExp(/^https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]{4,2048}$/)),
  }).unknown(true),
});

module.exports = registerValidator;
