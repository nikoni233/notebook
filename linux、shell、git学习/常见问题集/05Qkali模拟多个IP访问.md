你可以在Kali虚拟机中使用`iptables`来模拟多个IP访问CentOS。具体步骤如下：

1. **开启IP转发**：在Kali中运行：

	```
	echo 1 > /proc/sys/net/ipv4/ip_forward
	```

2. **设置虚拟IP**：使用`ip`命令添加虚拟IP：

	```
	ip addr add 192.168.255.130/24 dev eth0
	ip addr add 192.168.255.131/24 dev eth0
	```

3. **配置NAT和路由**（如果需要）：

	```
	iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
	```

这样，你就可以从CentOS接收到多个IP的访问了。需要注意的是，确保CentOS的防火墙规则允许这些IP访问。



4. **连接centos服务器**

	```
	ssh -b 192.168.255.130 用户名@192.168.255.128
	ssh -b 192.168.255.131 用户名@192.168.255.128
	```

	