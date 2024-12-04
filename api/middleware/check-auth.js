const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(process.env.jwt_key)
        const decodedToken = jwt.verify(token, process.env.jwt_key);
        console.log('reached here')
        req.userData = decodedToken;
        next();
    } catch(error){
        console.log(error)
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};