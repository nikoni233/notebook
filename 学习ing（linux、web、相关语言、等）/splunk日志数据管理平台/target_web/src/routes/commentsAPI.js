const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 定义评论存储的文件路径
const commentsFilePath = path.join(__dirname, '../../comments.json');

// 创建一个全局变量 content 用于存储最新评论
let content = "";

// 读取评论文件
function readComments() {
    if (fs.existsSync(commentsFilePath)) {
        const data = fs.readFileSync(commentsFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];  // 如果文件不存在，返回空数组
}

// 将评论写入文件
function writeComments(comments) {
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2), 'utf8');
}

// 获取所有评论
router.get('/', (req, res) => {
    const comments = readComments();
    res.json(comments);
});

// 提交评论
router.post('/', (req, res) => {
    const comment = req.body.comment;
    if (comment) {
        const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });  // 24小时格式
        const comments = readComments();
        comments.push({ comment, timestamp });  // 将评论和时间戳一起存储
        writeComments(comments);  // 更新评论文件
        // 同时更新 content 变量保存最新评论
        content = comment;
    }

    // 返回所有评论
    res.json(readComments());
});

// 获取最新评论
router.get('/content', (req, res) => {
    //res.json({ content });  // 返回存储的最新评论
    res.send(content);
});

// 重置评论
router.post('/reset', (req, res) => {
    const defaultComments = [
        { comment: "Welcome to the comment section!", timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }) },
        { comment: "Please feel free to leave your thoughts.", timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }) }
    ];
    writeComments(defaultComments);  // 将默认评论写入文件
    content = defaultComments[0].comment;  // 更新 content 为默认的第一条评论

    // 返回更新后的评论列表
    res.json(defaultComments);
});

module.exports = router;
