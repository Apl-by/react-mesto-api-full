const Card = require('../models/card');
const handleError = require('../errors/utils');
const handleSaftyStr = require('../utils/utils');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch((err) => handleError(err, next));
};

const createCard = (req, res, next) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  Card.create({ ...handleSaftyStr({ name }), link, owner: ownerId })
    .then((card) => res.send(card))
    .catch((err) => handleError(err, next));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId).orFail()
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => handleError(err, next));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => handleError(err, next));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => handleError(err, next));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
