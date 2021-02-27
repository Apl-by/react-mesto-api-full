const { celebrate, Joi } = require('celebrate');

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().pattern(/^[^<>]{2,30}$/),
    link: Joi.string().required().pattern(new RegExp(/^https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]{4,2048}$/)),
  }),
});

module.exports = cardValidator;
