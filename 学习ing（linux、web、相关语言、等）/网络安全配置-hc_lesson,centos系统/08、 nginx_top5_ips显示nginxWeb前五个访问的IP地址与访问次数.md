## 对于 nginx web 服务，显示前五个访问的IP地址与访问次数，编写shell脚本

### 需求及基本信息：

```
nginx
访问nginx web服务，前5个IP地址多少？
每个IP次数



[推荐]系统环境，rocky linux 8
[推荐]nginx 1.26
```

给的 `nginx_install.sh` 内容如下，nginx优化配置：

```shell
#!/bin/bash
#Description : Nginx Service Install
#Author      : hc
#Version     : 1.0
#Date        : 2024-10-13

if [ "${UID}" != "0" ];then
	echo "Must Be To Root."
	exit 1
fi

systemctl disable firewalld && systemctl stop firewalld
iptables -F && iptables -Z && iptables -X

GET_STATUS=`more /etc/selinux/config | grep -i '^SELINUX=' | awk -F"=" '{print $2}'`
if [ "${GET_STATUS}" == "enforcing" ];then
	sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
elif [ "${GET_STATUS}" == "permissive" ];then
	sed -i "s/SELINUX=permissive/SELINUX=disabled/g" /etc/selinux/config
fi

NIC_NAME=`ls -l /sys/class/net/ | grep -i 'pci'| awk -F"/" '{print $NF}'`
ping -c1 qq.com >/dev/null 2>&1
sleep 2
if [ "$?" != "0" ];then
	sed '\|DNS|d' /etc/sysconfig/network-scripts/ifcfg-${NIC_NAME}
	echo "DNS1=114.114.114.114" >> /etc/sysconfig/network-scripts/ifcfg-${NIC_NAME}
	nmcli connect reload && nmcli connect up ${NIC_NAME}
fi
ping -c1 qq.com >/dev/null 2>&1
sleep 2
if [ "$?" != "0" ];then
	echo "The LocalHost Service Is Accessible From The Internet."
	exit 1
fi

wget -v https://mirror.sjtu.edu.cn/fedora/epel/epel-release-latest-8.noarch.rpm -P /root && yum -y localinstall /root/epel-release-latest-8.noarch.rpm

dnf clean all && dnf makecache
sleep 5
yum -y install lrzsz net-tools curl wget vim lsof make gcc pcre-devel zlib-devel openssl-devel libxml2-devel libxslt-devel gd-devel GeoIP-devel jemalloc-devel perl-devel

if [ "$?" != "0" ];then
	echo "Packages Install Error."
	exit 1
fi

wget -v https://nginx.org/download/nginx-1.26.2.tar.gz -P /root
test ! -d /data01 && mkdir -pv /data01
tar -zxvf /root/nginx-1.26.2.tar.gz && cd /root/nginx-1.26.2
if [ "$?" != "0" ];then
	echo "Install Nginx Packages Error."
	exit 1
fi

cd /root/nginx-1.26.2
./configure --prefix=/data01/nginx \
    --with-threads \
    --with-file-aio \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_realip_module \
    --with-http_addition_module \
    --with-http_xslt_module=dynamic \
    --with-http_image_filter_module=dynamic \
    --with-http_geoip_module=dynamic \
    --with-http_sub_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_auth_request_module \
    --with-http_random_index_module \
    --with-http_secure_link_module \
    --with-http_degradation_module \
    --with-http_slice_module \
    --with-http_stub_status_module \
    --with-stream=dynamic \
    --with-stream_ssl_module \
    --with-stream_realip_module \
    --with-stream_geoip_module=dynamic \
    --with-stream_ssl_preread_module \
    --with-compat  \
    --with-pcre-jit
make && make install
	
if [ `lsof -i:80 |wc -l` != "0" ];then
	kill -9 `lsof -i:80 |grep -vi PID |awk -F" " '{print $2}'|xargs`
fi

```



### 操作步骤：

> 实验环境：
>
> kali虚拟机，ip是192.168.255.129。
> Ubuntu虚拟机，ip是192.168.255.130。
> 两台虚拟机处在同一局域网内，采用nat连接模式。
>
> Ubuntu作为服务端，提供nginx web服务。
> kali作为用户端，模拟多个ip对其进行访问。



#### 1. 在服务端主机安装nginx

```shell
sudo install nginx
```

检查服务运行情况：`sudo systemctl status nginx`

开启服务（如果未开启）：`sudo systemctl start nginx`

**通过浏览器访问测试页：** 在浏览器地址栏输入 `192.168.255.130`，即可访问。 

查看nginx流量日志：默认目录为 `/var/log/nginx/access.log` 

#### 2. 在服务端主机，为实现“输出前五个IP地址与访问次数”功能，编写shell脚本

命名为：`nginx_top5_ips.sh `

```shell
#!/bin/bash
# 脚本名字；nginx_top5_ips.sh
# nginx_top5_ips.sh - 提取Nginx访问日志中前5个IP及访问次数

# 检查是否有访问日志文件
log_file="/var/log/nginx/access.log"

if [ ! -f "$log_file" ]; then
    echo "无法找到 Nginx 访问日志文件：$log_file"
    exit 1
fi

# 统计IP访问次数并排序，显示前5个
echo "前5个访问Nginx的IP地址及访问次数："
awk '{print $1}' "$log_file" | sort | uniq -c | sort -nr | head -5
```

#### 3. 在用户端主机，模拟多IP请求访问，编写shell脚本

命名为：`ips_visit.sh`

```shell
#!/bin/bash
# 脚本名字；ips_visit.sh
# 在Kali中模拟多个IP对Nginx Web进行访问

startNum=200
endNum=207
visitNum_def=1
resultArr=()

for i in $(seq $startNum $endNum); do
    sudo ip addr add 192.168.255.$i/24 dev eth0
    resultArr+=("模拟IP：192.168.255.$i   访问次数：$visitNum_def")
    echo ${resultArr[visitNum_def-1]}
    for j in $(seq 1 $visitNum_def); do
        # Nginx Web服务器IP地址
        curl --interface 192.168.255.$i -s -o /dev/null -w "%{http_code}\n" http://192.168.255.130

    done
    
    ((visitNum_def++))  # 每次递增访问次数
    sudo ip addr del 192.168.255.$i/24 dev eth0
done
echo "=============================="
for i in $(seq 1 $(expr $visitNum_def - 1)); do
    echo ${resultArr[i-1]}
done
```

#### 4. 运行结果

- 用户端中运行shell脚本，输出如下：
	```text
	...(前面已省略)...
	==============================
	模拟IP：192.168.255.200 访问次数：1
	模拟IP：192.168.255.201 访问次数：2
	模拟IP：192.168.255.202 访问次数：3
	模拟IP：192.168.255.203 访问次数：4
	模拟IP：192.168.255.204 访问次数：5
	模拟IP：192.168.255.205 访问次数：6
	模拟IP：192.168.255.206 访问次数：7
	模拟IP：192.168.255.207 访问次数：8
	```

- 服务端中运行shell脚本，显示结果如下：
	```text
	前5个访问Nginx的IP地址及访问次数：
	     36 192.168.255.129
	      8 192.168.255.207
	      7 192.168.255.206
	      6 192.168.255.205
	      5 192.168.255.204
	```

	

























---

### 关于 `nginx_install.sh`的shell脚本解读（chatgpt）：

> Q：linux系统。解读一下这个shell脚本文件。
> `[文件]nginx_install.sh`

#### chatgpt的解读回答：

这个Shell脚本的功能是安装并配置Nginx服务，执行了一些系统配置和安全设置，详细解读如下：

##### 脚本结构概述：

1. **检查是否为root用户执行：**

	```shell
	if [ "${UID}" != "0" ]; then
	    echo "Must Be To Root."
	    exit 1
	fi
	```

	- 如果当前用户不是root用户，脚本会提示需要root权限并退出。

2. **关闭防火墙并清空iptables规则：**

	```shell
	systemctl disable firewalld && systemctl stop firewalld
	iptables -F && iptables -Z && iptables -X
	```

	- 关闭系统防火墙`firewalld`并停止服务，清空iptables的所有规则、计数器、链等。

3. **关闭SELinux：**

	```shell
	GET_STATUS=`more /etc/selinux/config | grep -i '^SELINUX=' | awk -F"=" '{print $2}'`
	if [ "${GET_STATUS}" == "enforcing" ]; then
	    sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
	elif [ "${GET_STATUS}" == "permissive" ]; then
	    sed -i "s/SELINUX=permissive/SELINUX=disabled/g" /etc/selinux/config
	fi
	```

	- 获取SELinux状态。如果是“enforcing”或“permissive”，则将其设置为“disabled”并修改配置文件。

4. **配置DNS：**

	```shell
	NIC_NAME=`ls -l /sys/class/net/ | grep -i 'pci' | awk -F"/" '{print $NF}'`
	ping -c1 qq.com >/dev/null 2>&1
	if [ "$?" != "0" ]; then
	    sed '\|DNS|d' /etc/sysconfig/network-scripts/ifcfg-${NIC_NAME}
	    echo "DNS1=114.114.114.114" >> /etc/sysconfig/network-scripts/ifcfg-${NIC_NAME}
	    nmcli connect reload && nmcli connect up ${NIC_NAME}
	fi
	```

	- 检测网络连接是否正常（通过ping `qq.com`），如果不通，则删除现有的DNS配置，并添加新的DNS服务器（114.114.114.114），然后重新加载并激活网络接口。

5. **下载并安装EPEL（Extra Packages for Enterprise Linux）源：**

	```shell
	wget -v https://mirror.sjtu.edu.cn/fedora/epel/epel-release-latest-8.noarch.rpm -P /root && yum -y localinstall /root/epel-release-latest-8.noarch.rpm
	```

	- 下载并安装EPEL源，便于后续安装一些额外的软件包。

6. **清理并更新软件缓存，安装必要的包：**

	```shell
	dnf clean all && dnf makecache
	yum -y install lrzsz net-tools curl wget vim lsof make gcc pcre-devel zlib-devel openssl-devel libxml2-devel libxslt-devel gd-devel GeoIP-devel jemalloc-devel perl-devel
	```

	- 清理包缓存并更新，安装了编译Nginx所需的依赖包，如`gcc`、`pcre-devel`等。

7. **下载并编译Nginx：**

	```shell
	wget -v https://nginx.org/download/nginx-1.26.2.tar.gz -P /root
	test ! -d /data01 && mkdir -pv /data01
	tar -zxvf /root/nginx-1.26.2.tar.gz && cd /root/nginx-1.26.2
	./configure --prefix=/data01/nginx \
	--with-threads --with-file-aio --with-http_ssl_module ...
	make && make install
	```

	- 下载Nginx的源代码，解压后进入源代码目录，使用指定的模块进行配置编译，并将Nginx安装到`/data01/nginx`目录下。

8. **检查80端口是否被占用：**

	```shell
	if [ `lsof -i:80 | wc -l` != "0" ]; then
	    kill -9 `lsof -i:80 | grep -vi PID | awk -F" " '{print $2}' | xargs`
	fi
	```

	- 检查80端口是否有其他进程占用，如果有则强制杀掉占用80端口的进程。

##### 脚本关键点：

- **权限验证**：脚本必须以root权限执行。
- **关闭防火墙和SELinux**：确保安装环境没有防火墙和安全机制阻碍网络服务的正常运行。
- **网络配置**：设置DNS和网络接口，确保服务器能访问外部资源。
- **Nginx编译安装**：使用自定义模块配置编译Nginx，并安装在自定义路径。

这个脚本自动化了Nginx安装及其依赖的配置，适合在CentOS或RHEL系统中执行。