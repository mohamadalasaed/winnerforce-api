const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const validateDbId = (req, res, next) => {
    if(ObjectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: `given object id (${req.params.id}) is not valid.`
        })
    }else{
        next()
    }
}

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error: 'no record with the given _id : ' + req.params.id
    })
}

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ error })
}

//verify token for admin
const verifyAdminToken = (req, res, next) => {
    let token = req.headers.authorization;
    let role = req.headers.role;
    if(!token || role!='admin'){
        res.status(400).json({error:'access rejected!'})
    }
    try{
        jwt.verify(token,process.env.privateKey)
        next();
    }catch(err){
        res.status(400).json({error:err})
    }
}

//verify token for user
const verifyUserToken = (req,res,next) => {
    let token = req.headers.authorization;
    if(!token){
        res.status(400).json({error:'access rejected!'})
    }
    try{
        jwt.verify(token,process.env.privateKey)
        next();
    }catch(err){
        res.status(400).json({error:err})
    }
}

//verify secret and clinet keys
var secretKey = process.env.SECRET_KEY
var clientKey = process.env.CLIENT_KEY

const verifySecretClient = (req,res,next) => {
    let sk = req.query.secretKey;
    let ck = req.query.clientKey;
    if(sk==secretKey && ck==clientKey){
        next();
    }else{
        res.status(400).json({error:'access rejected!, secretKEY and clientKEY are required'})
    }
}


module.exports = {
    validateDbId,
    raiseRecord404Error,
    errorHandler,
    verifyAdminToken,
    verifyUserToken,
    verifySecretClient
}
