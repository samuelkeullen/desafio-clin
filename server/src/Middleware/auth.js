const jwt = require('jsonwebtoken')
const AuthConfig = require('../Config/Auth.json')
const User = require('../Models/User')

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization

    if(!authHeader)
        return res.status(401).send({ error: "No Token Provided"})

    const parts = authHeader.split(' ')

    if(! parts.length === 2)
    return res.status(401).send({ error: "Token Error"})

    const [ scheme, token] = parts

    if(! /^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token Bad Formated"})

    
    jwt.verify(token, AuthConfig.secret, (err, decoded) =>{

        if(err) return res.status(401).send({ error: "Token Invalid: "+ err});

        req.userId = decoded.id

        req.token = token

        return next();
    })
}

exports.questions = async (req, res) => {

    try{

        const token = req.token

        const user = await User.findById(req.userId)

        if(! user){
            return res.status(404).send({ error: "User Not Authenticated or Not Found"})
        }

        if( await checkAuthentication({user,token}) === false){

            return res.status(400).send({ error: "User Not Authenticated"})
        } 
    
        const {monthlyRevenue, outstandingHospitalBills, hospitalBills, hospitalBillPayer} = req.body

        user.monthlyRevenue = monthlyRevenue
        user.outstandingHospitalBills = outstandingHospitalBills
        user.hospitalBills = hospitalBills
        user.hospitalBillPayer = hospitalBillPayer
    
        user.save()

        return res.status(200).send({user})

    }catch(err){

        return res.status(400).send({error: "Erro on try to save questions result: "+err})
    }
}