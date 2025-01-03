const express = require('express');
const router = express.Router();
const path = require('path');

// 处理文件上传的 POST 请求
router.post('/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;  // 获取上传的文件
    const uploadPath = path.join(__dirname, '../../uploads', file.name);

    // 将文件移动到上传目录
    file.mv(uploadPath, err => {
        if (err) {
            console.error('File upload failed:', err);
            return res.status(500).send({ success: false, message: err.message });
        }
        
        // 上传成功，返回 JSON 响应
        res.json({
            success: true,
            fileName: file.name
        });
    });
});

module.exports = router;
