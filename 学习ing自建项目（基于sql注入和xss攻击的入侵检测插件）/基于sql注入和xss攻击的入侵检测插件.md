## web靶场环境+入侵检测插件，基于xss攻击和sql注入

Node.js基本搭建可参考：[直达链接](Node.js一个简单的web服务器搭建.md)

---

#### ##项目结构##

```
MyNewWeb/
│
├── public/
│   └── index.html           # 前端 HTML 文件（已存在）
│
├── plugins/
│   └── InjectionDetection.js           # 入侵检测中间件（插件，外部导入）
│
├── attackVectors/
│   ├── sqlInjection.json 	# SQL 注入向量库（插件附属文件，外部导入）
│   └── xssInjection.json  	# XSS 注入向量库（插件附属文件，外部导入）
│
├── logs/
│   └── InjDetLogs.json           # 入侵检测的日志（插件运行时产生的日志）
│
├── package.json             # Node.js 项目描述文件（已存在）
└── server.js               # Node.js 服务器主文件（已存在）

```



#### ##食用方式##

1. **文件放到项目根目录下。**

2. **安装项目依赖库。**
	参考版本：
	"express": "^4.21.1",
	"sqlite3": "^5.1.7",
	"mysql2": "^3.11.3"

	```shell
	sudo npm install express
	sudo npm install sqlite3
	
	sudo npm install mysql2		# 可选
	```

3. **运行服务端。**

	```shell
	sudo node server.js
	```

4. **浏览器访问页面。**
	打开浏览器，地址栏输入 `http://localhost:3002` 。



#### ##【无插件】xss和sql的注入测试##

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





####  ##【启动插件】xss和sql的注入测试##

##### xss注入

```json
  {
    "time": "2024-10-19T03:31:53.618Z",
    "type": "XSS Injection",
    "ip": "::ffff:127.0.0.1",
    "input": "{\"content\":\"<script>alert(1)</script>\"}{}"
  },
```



##### sql注入

```json
  {
    "time": "2024-10-19T05:38:25.087Z",
    "type": "SQL Injection",
    "ip": "::ffff:192.168.255.1",
    "input": "{\"username\":\"张三\",\"password\":\"333' or '4' = '4\"}{}"
  },
  {
    "time": "2024-10-19T05:38:31.934Z",
    "type": "Normal",
    "ip": "::ffff:192.168.255.1",
    "input": "{\"username\":\"张三\",\"password\":\"333' or 'a' = 'a\"}{}"
  },
  {
    "time": "2024-10-19T05:31:26.043Z",
    "type": "SQL Injection",
    "ip": "::ffff:192.168.255.1",
    "input": "{\"username\":\"张三\",\"password\":\"1'UNION SELECT version(), NULL, NULL, NULL, NULL, NULL; -- \"}{}"
  },
```



