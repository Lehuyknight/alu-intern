const { render } = require("express/lib/response");
//create controller
class SiteController{
    index(req,res){
        res.render('login.ejs',{
            title: 'Login'
        });
    }
}

module.exports = new SiteController();