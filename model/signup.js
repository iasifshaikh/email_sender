const mongoose = require('mongoose')
const { MAX_LENGTH } = require('picomatch/lib/constants')
const bcrypt = require('bcrypt')
const signupSchema = mongoose.Schema({
    fname:{
        type:"String",
        require:"Title is required",
        minlenght:4,
        maxlenght:15
      },
      lname:{
        type:"String",
        require:"Title is required",
        minlenght:4,
        maxlenght:15
      },
      email:{
        type: "String",
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
        
    
      },
      pass:{
          type:"String",
          minlength:8,
          maxlenght:52,
      }
})

//save data
signupSchema.pre('save',async(next)=>{
  // console.log('hhhfsdsd')
  if(this.isModified('pass')){
    this.pass=bcrypt.hash(this.pass,12)
  }
  next()
})

module.exports = mongoose.model('signup',signupSchema)


