const { celebrate, Joi } = require('celebrate');

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().pattern(/^[^<>]{2,30}$/),
    about: Joi.string().required().pattern(/^[^<>]{2,30}$/),
  }),
});

module.exports = userValidator;
