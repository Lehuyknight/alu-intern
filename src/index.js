const { notStrictEqual } = require('assert');
const express = require('express');
const req = require('express/lib/request');
const app = express();
const path = require('path');
const siteController = require('./controller/site-controller');
require('dotenv').config();
//set view engine cho app, ở đây sử dụng ejs(embed javascript templating, dùng để nhúng code js vào file html)(hình như bên laravel có cái gọi là Blade)
app.set('view engine', 'ejs');

//set đường dẫn cho thư mục views(view engine phải có thư mục view thì mới đọc được)
app.set('views', path.join(__dirname, '..', 'resources', 'views'));

//set middleware để đọc dữ liệu json và form(can be change with body-parser)
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Express static dùng để lấy những file tĩnh mà không cần viết route
app.use(express.static(path.join(__dirname, '..', 'public')));

//Code for routes here
app.get('/login',siteController.index);
app.post('/login',siteController.login);

const server = app.listen(process.env.PORT || 4050, () => {
  console.log(`Listen complete. port ${server.address().port}`);
});
