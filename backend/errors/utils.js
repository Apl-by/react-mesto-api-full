const ConflictError = require('./ConflictError');
const ServerError = require('./ServerError');
const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');

const handleError = (err, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    return next(new ConflictError('Пользователь с такой почтой уже существует'));
  }
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return next(new BadRequestError(err.message));
  }
  if (err.name === 'DocumentNotFoundError') {
    return next(new NotFoundError(err.message));
  }

  return next(new ServerError('На сервере произошла ошибка'));
};

module.exports = handleError;
