const product = require('../db/model/model');


exports.product_GetAll = (req, res, next) => {
    product.find()
    .select('name price details productImage')
    .exec()
    .then(data => {
        const response = {
            count : data.length,
            products : data.map(product => {
                return {
                    _id : product._id,
                    name : product.name,
                    price : product.price,
                    details : product.details,
                    productImage : product.productImage.originalname,
                    request : {
                        type : 'GET',
                        productUrl : `http://localhost:3000/products/${product.name}`,
                        orderUrl : `http://localhost:3000/orders/${product.name}`
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
    })
};

exports.product_Create = (req, res, next) => {
    console.log(req.file)
    const productData = new product({
        name: req.body.name,
        price: req.body.price,
        details: req.body.details,
        productImage : req.file
    });
    productData
    .save()
    .then(data => {
        const response = {
            products : {
                name : data.name,
                price : data.price,
                details : data.details,
                productImage : data.productImage.originalname,
                _id : data._id,
                request : {
                    type : 'GET',
                    url : `http://localhost:3000/products/${data.name}`
                }
            }
            }
        res.status(201).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
    })
}

exports.product_Select = (req, res, next) => {
    id = req.params.id;
    product.findOne({"name": id})
    .select('name price details productImage')
    .then(data => {
        if(data){
            const response = {
                products : {
                    _id : data._id,
                    name : data.name,
                    price : data.price,
                    details : data.details,
                    productImage : data.productImage.originalname,
                    request : {
                        type : 'GET',
                        orderUrl : `http://localhost:3000/orders/${data.name}`,
                        ImageUrl : `http://localhost:3000/products/${data.productImage.path}`,
                        getAllProduct : `http://localhost:3000/products/`
                    }
                }
            }
            res.status(201).json({
                message : 'Product Captured',
                response
            })
        }else{
            res.status(404).json({
                message : 'No such product'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
    });
};

exports.product_Update = (req, res, next) => {
    id = req.params.id;
    updateParam = {};
    if(req.file){
        updateParam["productImage"] = req.file
    }else{
        for(const param in req.body) {
        updateParam[param] = req.body[param];
        };
    }
    console.log(updateParam)
    product.findOneAndUpdate({"name": id}, { $set: updateParam }, 
        { new: true } )
    .exec()
    .then((data) => {
        if (!data) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }
        res.status(200).json({
            message: 'Product updated successfully',
            product: {
                name : data.name,
                price : data.price,
                details : data.details,
                _id : data._id,
                productImage : data.productImage,
                request : {
                    type : 'GET',
                    productUrl : `http://localhost:3000/products/${data.name}`,
                    orderUrl : `http://localhost:3000/orders/${data.name}`                }
            }
        });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    });
};

exports.product_Delete = (req, res, next) => {
    id = req.params.id;
    product.findOne({"name": id})
    .then(data => {
        if(data !== null){
            product.deleteOne({"name": id}).then(data => {
                res.status(201).json({
                    message : 'Product Deleted',
                    data
                })
            });
            
        }else{
            res.status(500).json({
                message: "Product does not exist"
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err.message
        })
    })
};

