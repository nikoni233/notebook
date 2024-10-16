### Web基础环境搭建

Node.js基本搭建可参考：[直达链接](Node.js一个简单的web服务器搭建.md)

#### 基本目录结构

```java
web_xssANDsql_test/
├── public/
│   └── index.html
├── server.js
└── package.json
```



#### 前置库安装

```shell
npm install express
npm install mysql2
```



#### xss注入和sql注入测试

##### xss注入

```text
正常输入：hehe
xss注入，输入：<h1>hehe</h1>
xss注入，输入：<script>alert(1)</script>
```

##### sql注入

```text
正常输入：
用户名：张三   密码：123
sql注入，万能语句，显示登录成功，显示该表中全部数据：
用户名：hehe   密码：1' or '1' = '1
sql注入，显示数据库版本，要根据表的列数加NULL更改语句：
用户名：hehe
密码：
1'UNION SELECT version(), NULL, NULL, NULL, NULL, NULL; -- 
```



#### （Web基础环境，github库链接）

**Web基础环境，github库链接：**[Web Basic Environment - Intrusion Detection Plug-In Based On SQL Injection And XSS Attack at main · nikoni233/scripts (github.com)](https://github.com/nikoni233/scripts/tree/main/Web Basic Environment - Intrusion Detection Plug-In Based On SQL Injection And XSS Attack)

