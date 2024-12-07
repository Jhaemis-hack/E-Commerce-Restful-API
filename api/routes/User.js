const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');


router.get('/', userController.user_GetAll);

router.post('/signup', userController.user_Create);

router.post('/login', userController.user_Login);

router.patch('/changepassword/:email', userController.user_UpdatePassword);

router.post('/findEmail', userController.user_findEmail);

router.delete('/:email', userController.user_Delete);


module.exports = router;