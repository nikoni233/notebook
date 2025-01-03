const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// 处理图像请求
router.get('/', (req, res) => {
    // 获取文件名参数
    const filename = req.query.filename;

    // 存在目录遍历漏洞，未过滤用户输入
    const imagePath = path.join(__dirname, '../../image', filename);

    // 检查文件是否存在
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Image not found');
        }

        // 如果文件存在，返回该图像
        res.sendFile(imagePath);
    });
});

module.exports = router;
