### Node.js一个简单的web服务器搭建

#### 1.安装Node.js

- 下载并安装Node.js：
	```shell
	sudo yum install -y epel-release
	sudo yum install -y nodejs
	sudo yum install -y npm
	```

	

- 安装完成后，可以通过命令行检查安装是否成功：
	```shell
	node -v
	npm -v
	```

#### 2.创建项目结构

- 在项目根目录下，创建一个 `public` 文件夹，并将你的 `index.html` 文件放入其中：

```java
my-project/
├── public/
│   └── index.html
├── server.js
└── package.json
```

#### 3.编写 `index.html` 文件

- 在 `public/` 目录下创建 `index.html`，内容如下：
	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Simple Frontend-Backend Interaction</title>
	</head>
	<body>
	    <h1>简单的前后端交互示例</h1>
	    <p>请输入您的姓名：</p>
	    <input type="text" id="nameInput" placeholder="您的名字">
	    <button id="sendButton">发送到后端</button>
	    
	    <h2>服务器返回的消息：</h2>
	    <p id="responseMessage"></p>
	
	    <script>
	        document.getElementById('sendButton').addEventListener('click', function () {
	            const name = document.getElementById('nameInput').value;
	
	            // 使用 fetch API 向后端发送请求
	            fetch('/greet', {
	                method: 'POST',
	                headers: {
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({ name })
	            })
	            .then(response => response.json())
	            .then(data => {
	                document.getElementById('responseMessage').textContent = data.message;
	            })
	            .catch(error => {
	                document.getElementById('responseMessage').textContent = '请求失败';
	            });
	        });
	    </script>
	</body>
	</html>
	```

#### 4.编写 `server.js` 文件

- 在项目的根目录下创建 `server.js` 文件，内容如下：
	```javascript
	const express = require('express');
	const bodyParser = require('body-parser');
	const path = require('path');
	
	const app = express();
	const PORT = process.env.PORT || 3000;
	
	// 使用 body-parser 解析 JSON 请求体
	app.use(bodyParser.json());
	
	// 设置静态文件目录
	app.use(express.static(path.join(__dirname, 'public')));
	
	// 定义一个 POST 路由来处理前端的请求
	app.post('/greet', (req, res) => {
	    const name = req.body.name || '匿名用户';
	    res.json({ message: `你好，${name}！` });
	});
	
	// 启动服务器
	app.listen(PORT, () => {
	    console.log(`Server is running at http://localhost:${PORT}`);
	});
	```

#### 5.初始化项目

- 在你的项目根目录下打开终端，运行下面的指令：
	```shell
	npm init -y
	```

	这将创建一个 `package.json` 文件，包含项目的基本信息和依赖。

#### 6. **安装 Express**

- **Express** 是一个流行的 Node.js Web 应用框架，能够简化路由和请求处理。

	```shell
	npm install express
	```
	
- 如果出现**报错**：`npm ERR! network`等字样。

  1. **先检查网络连接问题** `ping bilibili.com`  。
  2. **查看你的 `npm` 版本**，有时版本过低也会导致网络超时问题。
  3. **切换 `npm` 镜像源**，例如淘宝的 `NPM` 镜像：`npm config set registry https://registry.npmmirror.com/`

#### 7. **启动服务器**

- 在你的项目根目录下打开终端，运行以下命令启动 Node.js 服务器：

  ```shell
  node server.js
  ```

  你应该会看到类似如下的输出`Server is running at http://localhost:3000`，表示服务器启动成功。

- 打开浏览器并访问 `http://localhost:3000`，你应该能看到你的 `index.html` 页面。



