const bcryptjs = require('bcryptjs')

const User = require('../database/models/User')




module.exports = (req, res) => {
   
    const { email, password } = req.body;
    User.findOne( { email: email }, (error, user) => {
          if (user) {
              bcryptjs.compare(password, user.password, (error, same) => {
                   if (same) {

                       req.session.userId = user._id 
                       res.redirect('/')
                   } else {
                       res.redirect('/auth/login')
                   }
              })
          }  else {
              return res.redirect('/auth/login')
          }       

    })


}