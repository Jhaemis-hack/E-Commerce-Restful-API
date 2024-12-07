const User = require('../db/model/user');
const bcrypt = require('bcrypt');
const { response } = require('express');
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

exports.user_UpdatePassword = async (req, res, next) => {
    try {
        const id = req.params.email
        const isUser = User.findOne({email:id})

        if(!isUser) res.status(400).json({message: 'User not found'})

        const { password } = req.body

        if(!password) res.status(400).json({message: 'No Password provided'});

        const hashedpassword = await bcrypt.hash(password, 10)

        const passwordUpdated = await User.findOneAndUpdate({"email":id}, { $set: { password: hashedpassword }})

        if(!passwordUpdated) res.status(400).json({ message: 'Couldn\'t update password' })

        passwordUpdated.save().then(user => {res.status(201).json({ message: 'Password updated', user})})
        .catch(err =>{console.log(err.message); res.status(404).json({ message: "Error updating"})})
    } catch (error) {
        console.log('an error occured')
        console.log(error.message)
    }
}

exports.user_findEmail = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'No password provided' });
        }

        const users = await User.find(); // Await the result of the database query

        for (const user of users) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // If a match is found, send the response and exit the function
                return res.status(200).json({
                    message: 'Email found',
                    email: user.email
                });
            }
        }

        // If no matches are found, send a single failure response
        return res.status(404).json({
            message: 'Auth failed',
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.user_Delete = (req, res, next) => {
    queryId = req.params.email;
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


