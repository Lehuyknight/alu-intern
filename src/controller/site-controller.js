const { render } = require('express/lib/response');
//add User schema
const User = require('../models/md_user');
//add bcrypt to encode
const bcrypt = require('bcrypt');
const salts = parseInt(process.env.SALT_ROUNDS);
//add Jwt to create token
const jwt = require('jsonwebtoken');
//create controller
class SiteController {
  //Middleware to check token
  checkAuthMiddleware(req, res, next) {
    //read cookie
    const { accessToken } = req.cookies;
    res.locals.isAuthenticated = false;
    try {
      const userInfoDecoded = jwt.verify(accessToken, process.env.SECRET);
      res.locals.isAuthenticated = true;
    } catch (e) {
        res.locals.isAuthenticated = false;
    }
    next();
  }

  //get dashboard controller
  indexUI(req, res) {
    //check Auth
    if(!(res.locals.isAuthenticated))
    {
        return res.redirect('/login');
    }  
    res.render('dashboard.ejs', {
      title: 'Dashboard',
    });
  }

  //get login controller
  loginUI(req, res) {
      //check Auth
    if(res.locals.isAuthenticated)
    {
        return res.redirect('/');
    }  
    res.render('login.ejs', {
      title: 'Login',
    });
  }
  //post login controller
  async loginHandler(req, res) {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        status: 'error',
        message: "This email isn's exist on system",
      });
    }
    //Check password
    //false
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({
        statusCode: 400,
        status: 'error',
        message: 'Wrong password',
      });
    //true
    //create token
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        uid: user._id,
        name: user.fullname,
      },
      process.env.SECRET
    );

    res
      .status(200)
      .cookie('accessToken', token, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
      })
      .json({
        statusCode: 200,
        status: 'success',
        message: 'Login succesfully',
        siteToRedirect: '/',
      });
  }

  //get signup controller
  signupUI(req, res) {
      //check Auth
    if(res.locals.isAuthenticated)
    {
        return res.redirect('/');
    }  
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
        message: 'This user had already exit',
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
      siteToRedirect: '/login',
    });
  }
}

module.exports = new SiteController();
