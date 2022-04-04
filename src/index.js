const { notStrictEqual } = require('assert');
const express = require('express');
const req = require('express/lib/request');
const app = express();
const db = require('./config/config');
const path = require('path');
const cookieParser = require('cookie-parser');
const siteController = require('./controller/site-controller');
require('dotenv').config();
//set view engine cho app, ở đây sử dụng ejs(embed javascript templating, dùng để nhúng code js vào file html)(hình như bên laravel có cái gọi là Blade)
app.set('view engine', 'ejs');

//set đường dẫn cho thư mục views(view engine phải có thư mục view thì mới đọc được)
app.set('views', path.join(__dirname, '..', 'resources', 'views'));

//set middleware để đọc dữ liệu json và form(can be change with body-parser)
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//use cookieparser
app.use(cookieParser());

//Express static dùng để lấy những file tĩnh mà không cần viết route
app.use(express.static(path.join(__dirname, '..', 'public')));

//connect db
db.connectDB(); 

//import checkAuthMiddleware
app.use(siteController.checkAuthMiddleware);

//Code for routes here

//!Dashboard
app.get('/',siteController.indexUI);

//!Login
app.get('/login',siteController.loginUI);
app.post('/login',siteController.loginHandler);

//!SignUp
app.get('/signup',siteController.signupUI);
app.post('/signup',siteController.signupHandler);



const server = app.listen(process.env.PORT || 4050, () => {
  console.log(`Listen complete. port ${server.address().port}`);
});
