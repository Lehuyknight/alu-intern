const { render } = require("express/lib/response");

class SiteController{
    index(req,res){
        res.send('Hello');
    }
}

module.exports = new SiteController();