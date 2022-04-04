const { render } = require("express/lib/response");
//create controller
class SiteController{
    index(req,res){
        res.send('Hello');
    }
}

module.exports = new SiteController();