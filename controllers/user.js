const User = require('../db/model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_GetAll = (req, res, next) =>{
    User.find()
    .exec()
    .then(data => {
        const response = {
            count : data.length,
            usersDetails : data.map(user => {
                return {
                    _id : user._id,
                    email : user.email,
                    request : {
                        type : 'GET',
                        userUrl : `http://localhost:3000/user/${user.email}`,
                    }
                }
            })
        }
        console.log(data);
        res.status(201).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        });
    });
};

exports.user_Create = (req, res, next) =>{
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save()
    .then(data => {
        console.log(data);
        res.status(201).json({
            message : 'User created',
            user : {
                _id : data._id,
                email : data.email
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        });
    });
};

exports.user_Login = (req, res, next) => {
    User.findOne({"email": req.body.email})
    .exec()
    .then(data => {
        if(data !== null){
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if(result){
                    const token = jwt.sign(
                        {
                        userEmail : data.email,
                        userId : data._id
                        },
                        process.env.jwt_key,
                        {
                        expiresIn: "1h"
                        }
                    );

                    console.log(result)
                    res.status(201).json({
                        message: "Login successful",
                        token: token
                    })
                }else{
                    console.log(err)
                    res.status(404).json({
                        message: "Auth failed",
                    })
                }
            });
        }else{
            res.status(404).json({
                message: "Auth failed",
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            error : err.message
        })
    })
};

exports.user_Delete = (req, res, next) => {
    queryId = req.params.id;
    User.findOne({"email": queryId})
    .then(data =>{
        if(data !== null){
            User.deleteOne({"email": queryId}).then(data => {
                res.status(201).json({
                    message : 'User deleted',
                    data,
                    request : {
                        type : 'GET',
                        getAllUsers : `http://localhost:3000/user/`
                    }
                });
            });
        }else{
            res.status(404).json({
                message : 'User not found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        });
    });
};


