const { render } = require('express/lib/response');
//add User schema
const User = require('../models/md_user');
//add bcrypt to encode
const bcrypt = require('bcrypt');
const salts = parseInt(process.env.SALT_ROUNDS);

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
    res.render('signup.ejs', {
      title: 'Sign Up',
    });
  }
  //post signup controller
  async signupHandler(req, res) {
    var { fullname, email, password } = req.body;
    const user = await User.find({ email });

    if (user.length !== 0)
      return res.status(400).json({
        statusCode: 400,
      });
    //encode password with bcrypt
    password = await bcrypt.hash(password, salts);
    try {
      //Create new collection if dont have any error
      await User.create({ fullname, email, password });
    } catch (e) {
      console.log(e);
      throw new Error('Cant handle this request');
    }
    res.status(200).json({
      statusCode: 200,
      message: 'Sign Up succesfully!',
      password,
    });
  }
}

module.exports = new SiteController();
