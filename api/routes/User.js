const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');


router.get('/', userController.user_GetAll);

router.post('/signup', userController.user_Create);

router.post('/login', userController.user_Login);

router.delete('/:id', userController.user_Delete);


module.exports = router;