const { celebrate, Joi } = require('celebrate');

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = idValidator;
