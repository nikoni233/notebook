const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const router = express.Router();

router.post('/', (req, res) => {
    const filename = req.body.filename;
    const uploadDir = path.join(__dirname, '../../uploads/');

    // 执行命令来查找文件并回显命令结果
    exec(`ls ${uploadDir} | grep ${filename}`, (err, stdout, stderr) => {
        if (err || stderr) {
            return res.status(500).send('Error occurred during search');
        }

        // 返回命令执行的结果
        let responseHtml = `<h2>Command Output:</h2><pre>${stdout}</pre>`;

        const foundFiles = stdout.split('\n').filter(file => file.trim() !== '');

        if (foundFiles.length === 0) {
            responseHtml += '<h1>No file found</h1>';
            return res.send(responseHtml);
        }

        const filePath = path.join(uploadDir, foundFiles[0]);
        const extname = path.extname(filePath).toLowerCase();

        // 判断文件是否是图片
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(extname)) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading file');
                }
                responseHtml += `<h3>Image found: ${foundFiles[0]}</h3>`;
                responseHtml += `<img src="data:image/png;base64,${data.toString('base64')}" />`;
                return res.send(responseHtml);
            });
        } else {
            // 读取文本文件内容并回显
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading file');
                }
                responseHtml += `<h3>Text File Content:</h3><pre>${data}</pre>`;
                res.send(responseHtml);
            });
        }
    });
});

module.exports = router;
