const express = require('express');
const req = require('express/lib/request');
const app = express();
const path = require('path');
require('dotenv').config();
//set view engine cho app, ở đây sử dụng ejs(embed javascript templating, dùng để nhúng code js vào file html)(hình như bên laravel có cái gọi là Blade)
app.set('view engine', 'ejs');
//set đường dẫn cho thư mục views(view engine phải có thư mục view thì mới đọc được)
app.set('views', path.join(__dirname, '..', 'resources', 'views'));

//Express static dùng để lấy những file tĩnh mà không cần viết route
app.use(express.static(path.join(__dirname, '..', 'public')));

const server = app.listen(process.env.PORT || 4050, () => {
  console.log(`Listen complete. port ${server.address().port}`);
});
