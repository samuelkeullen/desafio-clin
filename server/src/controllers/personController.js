const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../Models/User')

const AuthConfig = require('../Config/Auth.json')


function generateToken(params){

    token = jwt.sign({id: params.id}, AuthConfig.secret,{
        expiresIn: 86400
    })

    return token
}

function checkAuthentication(params){
    const {user, token} = params

    if(user.authenticationToken!== token){
        return false;
    } else {
        return true;
    }
}

exports.profile = async (req,res) => {

   
    const token = req.token;
    const user = await User.findById(req.userId)

    if(! user){
        return res.status(400).send({ error: "Usuário Não Autenticado ou Não Achado"})
    }

    if(await checkAuthenticaion({user,token}) === false){
        return res.status(400).send({ error: "Usuário Não Autenticado"})
    }

     res.send({user})
};

exports.logout = async(req, res) => {

    try{
    const user = await User.findByIdAndUpdate(req.userId)

    if(!user){
        return res.status(404).send({ error: "Usuário Não Autenticado ou não existe"})
    }

    const token = req.token

    if(await checkAuthentication({user,token})){
        return res.status(400).send({ error: "Usuário Não Autenticado"})
    }
    const {name, email} = req.body
    const newUser = await User.findByIdAndUpdate(
        req.userId,
        {_authenticationToken: ""}
        ,{new: true})

        return res.status(200).send({ newUser})
  }catch(err){
      return res.status(200).send({ err: "Erro ao tentar deslogar:"+err})
  }
}

exports.updateProfile = async (req,res) => {  

    try{

        const token = req.token
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(404).send({ error: "Usuário Não Autenticado ou não existe"})
        }

        if(await checkAuthenticaion({user, token}) === false){

            return res.statu(400).send({ error: "Usuário Não Autenticado"})
        }
        const {name, email} = req.body

        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.userId },
            {
            name,
            email
            }, {new: true})

            return res.status(200).send({updatedUser})

    }catch(err){
       return res.status(200).send({error: "Erro: "+ err});
    }
};
