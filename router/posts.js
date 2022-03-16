const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer')
const signupSchema = require('../model/signup')

router.get('/user', async(req, res)=>{
    try{
        const users = await signupSchema.find()
        res.json(users)
    }catch(err){
        res.json({ message : err})
    }
})
//mail sender code 
const mailSender = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requiredTLS:true,
    auth:{
        user:"shaikhmohdasif74@gmail.com",
        pass:"Mohd@123"
    }
})


router.post('/signup',async(req,res)=>{
    console.log(req.body)
    const post = new signupSchema({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        pass:req.body.pass
    })
    try{
        const savePost= await post.save();
        res.json(savePost);
        // send mail code goes here
        
        const mailOption={
            from:'shaikhmohdasif74@gmail.com',
            to:`${req.body.email}`,
            subject:"email send successfully at nodejs",
            text:"Now email send successfully"
        }
        mailSender.sendMail(mailOption,function(err,info){
            if(err){
                console.log(err)
            }
            else{
                console.log('successfully email was send')
            }
        })
    }catch(err){
        res.json({message:err});
    }
    // post.save()
    // .then(data =>{
    //     res.json(data);
    // })
    // .catch(err =>{
    //     res.json({message: err})
    // })
})



module.exports = router;