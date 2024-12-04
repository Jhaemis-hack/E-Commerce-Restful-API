const order = require('../db/model/order');
const product = require('../db/model/model')

exports.order_GetAll = (req, res, next) => {
    order.find()
    .select('productName quantity')
    .exec()
    .then(data => {
        const response = {
            count : data.length,
            products : data.map(order => {
                return {
                    _id : order._id,
                    productNmae : order.productName,
                    Quantity : order.quantity,
                    request : {
                        type : 'GET',
                        productUrl : `http://localhost:3000/products/${order.productName}`,
                        orderUrl : `http://localhost:3000/orders/${order.productName}`
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

exports.order_Create = (req, res, next) => {
    const name = req.params.id;
    product.findOne({"name":name})
    .then(data => {
        if(data){
            const orderData = new order({
                productName: name,
                quantity: req.body.quantity
            });
            orderData.save()
            .then(data => {
                const response = {
                    order: {
                        orderId: data._id,
                        productName: name,
                        Quantity : data.quantity
                    }
                }
                res.status(201).json({
                    message : "order created",
                    response
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err.message
                })
            })
        }else{
            res.status(500).json({
                message: "Product does not exist"
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
        Error : err.message
        })
    })
};

exports.order_Select = (req, res, next) => {
    name = req.params.id;
    order.findOne({"productName": name})
    .select('_id productName quantity')
    .then(data => {
        if(data){
            res.status(201).json({
                message : 'Product\'s order Captured',
                product : data,
                request : {
                    type : 'GET',
                    productUrl : `http://localhost:3000/products/${data.productName}`
            }
            })
        } else{
            res.status(404).json({
                message : 'No order for this product exist'
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

exports.order_Update = (req, res, next) => {
    name = req.params.id;
    updateParam = {};
    for(const param in req.body) {
        updateParam[param] = req.body[param];
    };

    order.findOneAndUpdate({"productName": name}, { $set: updateParam }, 
        { new: true } )
    .exec()
    .then((data) => {
        if (!data) {
            return res.status(404).json({
                message: 'order not found',
            });
        }
        res.status(200).json({
            message: 'order updated successfully',
            product: {
                _id : data._id,
                productName : data.productName,
                Quantity : data.quantity,
                request : {
                    type : 'GET',
                    productUrl : `http://localhost:3000/products/${data.productName}`,
                    orderUrl : `http://localhost:3000/orders/${data.productName}`
                }
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

exports.order_Delete = (req, res, next) => {
    name = req.params.id;
    order.findOne({"productName": name})
    .then(data => {
        if(data !== null){
            order.deleteOne({"productName": name}).then(data => {
                res.status(201).json({
                    message : 'Product Deleted',
                    data
                })
            });
            
        }else{
            res.status(500).json({
                message: "Order does not exist"
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