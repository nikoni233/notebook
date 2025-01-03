const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL 配置
const db = mysql.createConnection({
    host: 'localhost',      // 数据库主机地址
    user: 'root',           // 数据库用户名
    password: 'root123456',           // 数据库密码
    database: 'testdata_stu' // 使用的数据库名称
});

// 连接到数据库
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// 处理 SQL 查询的路由
//---------------------sql---------------------------------
router.post('/', (req, res) => {
    console.log('Received request with body:', req.body); // 打印接收到的请求内容
    const { username, password } = req.body;

    // 演示SQL注入漏洞：将用户输入的用户名和密码直接嵌入到SQL查询中
    const query = `SELECT * FROM acct_stu WHERE acct = '${username}' AND passwd = '${password}'`;

    console.log("Generated SQL Query: ", query); // 输出生成的SQL查询，便于调试

    db.query(query, (err, results) => {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.json({
                message: "查询错误",
                userInfo: "无法查询账户"
            });
        }

        if (results.length > 0) {
            const userIds = results.map(result => result.id); // 获取所有匹配的用户ID

            // 如果账户存在，查询用户详细信息
            const infoQuery = `SELECT * FROM info_stu WHERE id IN (${userIds.join(',')})`;
            db.query(infoQuery, (err, userInfo) => {
                if (err) {
                    console.error('SQL Error:', err.message);
                    return res.json({
                        message: "查询错误",
                        userInfo: "无法查询详细信息"
                    });
                }

                if (userInfo.length > 0) {
                    // 返回所有匹配的账户信息和详细信息
                    res.json({
                        message: "登录成功",
                        userInfo: results.map(result => {
                            const userDetails = userInfo.find(info => info.id === result.id);
                            return {
                                accountInfo: result,
                                details: userDetails
                            };
                        })
                    });
                } else {
                    res.json({
                        message: "登录失败",
                        userInfo: "未找到相关信息"
                    });
                }
            });
        } else {
            res.json({
                message: "登录失败",
                userInfo: "用户名或密码错误"
            });
        }
    });
});

module.exports = router;
