const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const orderController = require("../../controllers/order");


router.get('/', checkAuth, orderController.order_GetAll);

router.post('/:id', checkAuth, orderController.order_Create);

router.get('/:id', checkAuth, orderController.order_Select);

router.patch('/:id', checkAuth, orderController.order_Update);

router.delete('/:id', checkAuth, orderController.order_Delete);


module.exports = router;