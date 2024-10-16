## 用xshell外部连接kali主机

### kali启用ssh连接服务，允许其他主机通过ssh连接kali

1. 在kali中找到`sshd_config`配置文件进行修改

  > 文件路径：
  > /etc/ssh/sshd_config

2. 修改参数`permitRootLogin `和`permitRootLogin `，改为yes
	2.1. 我们需要修改参数有两个分别为

	```shell
	permitRootLogin yes
	pubkeyAuthentication yes
	```

	2.2. 在文本中找到这两个参数

	> 在vi里，我们在命令模式中用“/”反斜杠来查找字符
	> 例如 /permitRootLogin 就能查到我们要找的字符
	> 如果找不到对应的参数，我们可以在该文档的尾部，直接添加
	> permitRootLogin yes
	> 这句话翻译改过来就是:允许root账号登陆
	> pubkeyAuthentication yes
	> 这句话翻译就是：公开密钥验证

3. 重启ssh服务，重启后查看服务运行正常，即可ssh连接了

	```shell
	systemctl restart ssh.service
	```

	> 查看ssh服务
	>
	> ```shell
	> systemctl status ssh.service
	> #显示`Active: active (running)`就是正常的
	> ```
	>
	> 状态码：
	> active(running)：表示程序正在执行
	> atcive(exited)：执行一次就正常退出的服务，不在系统中执行任何程序
	> active(waiting)：正在执行中，不过要等其他服务执行完在继续执行
	> inactive：服务关闭
	> disable：服务开机不启动
	> enable：服务开机启动
	> static：服务开机启动项被管理
	> failed：服务配置错误



### kali设置ssh服务开机自启

```shell
systemctl enable ssh
```



### kali通过ssh连接其他主机

1. 确认已安装SSH客户端
	Kali Linux 默认自带 `ssh` 客户端，但你可以通过以下命令确认是否已经安装：

	```shell
	ssh -V
	```

	如果没有安装，可以使用以下命令安装：
	```shell
	sudo apt update
	sudo apt install openssh-client
	```

2. 连接指定主机
	```shell
	ssh 用户名uersname@主机的IP地址remote_host_ip
	```

	
