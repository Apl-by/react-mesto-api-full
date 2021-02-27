const router = require('express').Router();
const controller = require('../controllers/users');
const userValidator = require('../middlewares/validators/userValidator');
const avatarValidator = require('../middlewares/validators/avatarValidator');

// router.get('/', controller.getUsers);  -----???
// router.get('/:id', controller.getUser);
router.get('/me', controller.getUser);
router.patch('/me', userValidator, controller.updateUser);
router.patch('/me/avatar', avatarValidator, controller.updateUserAvatar);

module.exports = router;
