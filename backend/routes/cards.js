const router = require('express').Router();
const controller = require('../controllers/cards');
const cardValidator = require('../middlewares/validators/cardValidator');
const cardIdValidator = require('../middlewares/validators/cardIdValidator');

router.get('/', controller.getCards);
router.post('/', cardValidator, controller.createCard);
router.delete('/:cardId', cardIdValidator, controller.deleteCard);
router.put('/:cardId/likes', cardIdValidator, controller.likeCard);
router.delete('/:cardId/likes', cardIdValidator, controller.dislikeCard);

module.exports = router;
