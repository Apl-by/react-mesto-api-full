const router = require('express').Router();
const controller = require('../controllers/cards');
const cardValidator = require('../middlewares/validators/cardValidator');

router.get('/', controller.getCards);
router.post('/', cardValidator, controller.createCard);
router.delete('/:cardId', controller.deleteCard);
router.put('/:cardId/likes', controller.likeCard);
router.delete('/:cardId/likes', controller.dislikeCard);

module.exports = router;
