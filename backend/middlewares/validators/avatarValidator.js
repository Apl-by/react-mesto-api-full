const { celebrate, Joi } = require('celebrate');

const avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(/^https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]{4,2048}$/)),
  }),
});

module.exports = avatarValidator;
