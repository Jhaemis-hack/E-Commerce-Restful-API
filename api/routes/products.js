const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const productController = require('../../controllers/product');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const upload = multer({storage: storage})


router.get('/', productController.product_GetAll)

router.post('/', upload.single('productImage'), checkAuth, productController.product_Create);

router.get('/:id', productController.product_Select)

router.patch('/:id', upload.single("productImage"), checkAuth, productController.product_Update)

router.delete('/:id', checkAuth, productController.product_Delete);


module.exports = router;