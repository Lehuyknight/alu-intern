const { render } = require('express/lib/response');
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
  signupHandler(req, res){
      
  }
}

module.exports = new SiteController();
