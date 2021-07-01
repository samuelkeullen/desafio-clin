const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthConfig = require('../Config/Auth.json');
const crypto = require('crypto');
const Mailer = require('../modules/mailer');

// Models
const User = require('../Models/User');
const Blogs = require('../Models/Blogs');
const Comments = require('../Models/Comments');


function generateToken(params){

    token = jwt.sign({id: params.id}, AuthConfig.secret,{
        expiresIn: 86400
    })

    return token
}

router.get('/', (req, res, next) => {
    res.status(200).send({
        "message":"funcionando"
    }) 
})

router.post('/criar-blog', (req, res, next) => {
  const { body } = req;

  const finalBlog = new Blogs(body);
  return finalBlog.save()
    .then(() => res.json({ blogs: finalBlog.toJSON() }))
    .catch(next);
});

router.get('/feed', (req, res, next) => {
  return Blogs.find()
    .sort({ createdAt: 'descending' })
    .then((blogs) => res.json({ blogs: blogs.map(blogs => blogs.toJSON()) }))
    .catch(next);

    res.send({
        blogs : blogs
    })
});

router.post('/send-comment', (req, res) => {
    const {
        blog_id,
        author_id,
        body
    } = req.body;
    
    try {
        
        const comment = Comments.create({
            blog_id: blog_id,
            author_id: author_id,
            body: body
        });

        console.log({ comment })
        
        return res.status(200).send()

    } catch (err) {
        return res.status(400).send({ err });
    }
});

router.get('/get-comments/:blog_id', (req, res, next) => {
    const blog_id = req.params.blog_id;

    
    return Comments.find()
      .where("blog_id").find({ blog_id })
      .then((comments) => {
          let data = ({ comments: comments.map(comments => comments.toJSON()) })
          console.log(data)
          res.json(data)
        })
      .catch(next);
});

router.get('/like-the-blog/:blog_id', (req, res, next) => {
    const blog_id = req.params.blog_id;

    Blogs.findOneAndUpdate({_id :blog_id}, {$inc : {'likes' : 1}}).then(
        (updated) => {
            console.log('updated')
        }
    );

    return Blogs.find({"_id": blog_id})
      .select()
      .then((likes) => res.json(likes))
      .catch(next);
});

router.get('/get-user-blog/:author_id', (req, res, next) => {
    // const author_id = req.params.author_id;

    // return Blogs.find()
    // .where("author_id").equals(author_id)
    // .then((author_id) => { 
    //     let data = ({author_id : author_id.map(author_id => author_id.toJSON()) })
    //     res.json(data)
    // })
    // .catch(next);
})

router.get('/get-blog/:_id', (req, res, next) => {
    const _id = req.params._id;

    return Blogs.find()
    .where("_id").find({_id})
    .then((_id) => {
        let data = ({_id : _id.map(_id => _id.toJSON()) })
        // console.log(data.id[0].)
        res.json(data)

    })
    .catch(next);
})

router.delete('/delete-blog/:_id', (req, res, next) => {
    // const _id = req.params._id;

    // return Blogs.find()
    // .where("_id").equals(_id)
    // .then((_id) =>  res.json({_id : _id.map(_id => _id.delete()) }))
    // .catch(next);
})

router.delete('/delete-user/:_id', (req, res, next) => {
    // const _id = req.params._id;

    // return User.find()
    // .where("_id").equals(_id)
    // .then((_id) =>  res.json({_id : _id.map(_id => _id.delete()) }))
    // .catch(next);
})

router.delete('/delete-comment/:_id', (req, res, next) => {
    // const _id = req.params._id;

    // return Comments.find()
    // .where("_id").equals(_id)
    // .then((_id) =>  res.json({_id : _id.map(_id => _id.delete()) }))
    // .catch(next);
})

router.post('/login', async (req, res) => {

    try{

    const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password')
        const username = await User.findOne({email}).select('name')
        

        if(!user){

            return res.status(400).send({error: 'Usuário Não Achado'})
        }

        if( await bcrypt.compare( password, user.password) === false){
            return res.status(400).send({error: 'Senha Inválida'})
        }

        const authenticationToken = await generateToken({id: user.id})

        const newUser = await User.findByIdAndUpdate(user._id,{ authenticationToken }, {new: true})

        user.password = undefined

        jwt_token = authenticationToken
        response_obj = newUser
        response_code = 1
        

        res.send({
            username,
            jwt_token,
            response_code
        });

    }catch(err){

        res.status(400).send({error: "Erro ao Autenticar: "+err});

    }
});

router.post('/registro', async (req, res) => {  

    const {email} = req.body  
      
    try {


        if(await User.findOne({ email })){

            return res.status(400).send({error: 'Usuário já existe'})
        }

        const user = await User.create(req.body)

        authenticationToken = await generateToken({id: user.id})

        await user.update({authenticationToken})

        user.password = undefined

        auth_user = user
        jwt_token = authenticationToken
        response_obj = user
        response_code = 1

        const user_id = user._id
        
        res.header( "Access-Control-Allow-Origin" );
        return res.send({
            response_obj,
            jwt_token,
            response_code
        })
    } catch (err) {
        return res.status(400).send({error: "Falha ao registrar: "+err, response_code: 0})           
    }     
});


router.post('/esqueci-a-senha', async (req, res) => {

    const { email } = req.body;

        try {
            
            const user = await User.findOne({ email });

            if(!user)
            return res.status(400).send({ error: "Usuário Não Encontrado"});

            const token = crypto.randomBytes(20).toString('hex')

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set':{
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })

            Mailer.sendMail({

                to: email,
                from: 'Clin-Blog <sklinfotechnologies@gmail.com>',
                text: 'Use o token para recuperar a senha ;)',
                subject:"Recuperar a senha",
                template:'Auth/forgot-password',
                context: { token }
            },(err) =>{

                if(err)
                return res.status(400).send({ error: "Não foi possível enviar o email de esqueci a senha:"+err})

                return res.status(200).send({
                    to: email,
                    from:"sklinfotechnologies@gmail.com",
                    subject:"Recuperar a senha"
                })
            })

            console.log(token, now);

        } catch (err) {
            return res.status(400).send({ error: 'Erro: ' +err+ "Tente novamente"})
        }
});

router.post('/perfil', async (req, res) => {

    try{

        const {user_email, user_name} = req.body;
    
            const user = await User.findOne({user_email}).select('+user_name')
    
            if(!user){
    
                return res.status(400).send({error: 'Usuário Não Encontrado'})
            }
    
            response_obj = user
            response_code = 1
            
    
            res.send({
                response_obj,
                response_code
            });
    
        }catch(err){
    
            res.status(400).send({error: "Erro ao Autenticar: "+err});
    
        }
    });


router.post('/mudar-senha', async (req, res) => {

    try {
        
        const { email, password, token} = req.body
    
    const user = await User.findOne({email}).select("+passwordResetToken passwordResetExpires")
    
    if(! user)
            return res.status(400).send({ error: 'Usuário Não Encontrado'});

    if(! token === user.passwordResetToken)
        return res.status(400).send({error: "Token Inválido"})

    now = new Date();

    if( now > user.passwordResetExpires)
      return res.status(400).send({error: "Token Expirado"})

    user.password = password;

      user.save()

    return res.status(200).send({response_code : 1})

    } catch (err) {
        
        return res.status(400).send({error: "Erro ao tentar mudar a senha: "+err, response_code : 0})
    }

});

module.exports = router;
