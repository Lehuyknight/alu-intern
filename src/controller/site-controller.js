const { render } = require('express/lib/response');
//add User schema
const User = require('../models/md_user');

//create controller
class SiteController {
  //get login controller
  loginUI(req, res) {
    res.render('login.ejs', {
      title: 'Login',
    });
  }

  //post login controller
  loginHandler(req, res) {
    res.json(req.body);
  }

  //get signup controller
  signupUI(req, res) {
      res.render('signup.ejs',{
          title: 'Sign Up',
      });
  }
  //post signup controller
  async signupHandler(req, res){
      const {fullname, email, password} = req.body;
      const user = await User.find({email});

      if(user){
          return res.statusCode(400).json({
              statusCode:400,
              message: "This user had already exist"
          })
      }
  }
}

module.exports = new SiteController();
