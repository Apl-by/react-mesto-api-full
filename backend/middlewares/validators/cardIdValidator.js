const { celebrate, Joi } = require('celebrate');

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = cardIdValidator;
