const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

// 初始化应用
const app = express();
const port = 3000;

// 使用中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 使用 express-fileupload，并设置最大文件大小为 10MB
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    abortOnLimit: true,  // 超过限制时直接抛出错误
    responseOnLimit: 'File size exceeds limit.' // 超过限制时返回的错误信息
}));


// 路由模块
app.use('/login', require('./routes/sqlAPI'));
app.use('/upload', require('./routes/fileUploadAPI'));
app.use('/search', require('./routes/searchAPI'));
app.use('/comments', require('./routes/commentsAPI'));
app.use('/image', require('./routes/imageAPI'));



// 启动应用
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
