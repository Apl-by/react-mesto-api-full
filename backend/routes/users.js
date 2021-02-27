const router = require('express').Router();
const controller = require('../controllers/users');
const userValidator = require('../middlewares/validators/userValidator');
const avatarValidator = require('../middlewares/validators/avatarValidator');
const idValidator = require('../middlewares/validators/idValidator');

router.get('/', controller.getUsers);
router.get('/:id', idValidator, controller.getUser);
router.get('/me', controller.getMe);
router.patch('/me', userValidator, controller.updateUser);
router.patch('/me/avatar', avatarValidator, controller.updateUserAvatar);

module.exports = router;
