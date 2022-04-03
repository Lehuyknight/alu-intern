const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require('path');
require('dotenv').config();

//Express static dùng để lấy những file tĩnh mà không cần viết route
app.use(express.static(path.join(__dirname,'..','public')));

const server = app.listen(process.env.PORT || 4050,()=>{
    console.log(`Listen complete. port ${server.address().port}`);
});