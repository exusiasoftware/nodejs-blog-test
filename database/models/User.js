
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema({

   username: {
      type: String,
      required: [true, 'Please provide your username']
   },
   email:  {
        type: String,
        required: [true,'Please provide you email address'],
        unique: true  
   },
   password: {
    type: String,
    required: [true, 'Please provide a password']
  }

 

})


UserSchema.pre('save', function(next) {
    
    const user = this 
    bcryptjs.hash(user.password, 10, function(error, encrypted) {

         user.password = encrypted

         next()

    })

})


const User = mongoose.model('User', UserSchema)

module.exports = User