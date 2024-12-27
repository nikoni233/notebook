报错：-bash: wget: command not found
更新组件包：
sudo yum update
添加额外的源：
dnf -y install epel-release
安装：
sudo yum install wget
sudo yum install tar
sudo yum install bzip2
yum -y install lrzsz net-tools curl wget vim lsof make gcc pcre-devel zlib-devel openssl-devel libxml2-devel libxslt-devel gd-devel GeoIP-devel jemalloc-devel perl-devel


nginx官网www.nginx.org；download界面https://nginx.org/en/download.html；
选择stable version中的nginx-1.26.2复制链接；
选择Mainline version选择nginx-1.27.3复制链接；

1.1.下载nginx-1.26.2.tar.gz并解压：
cd /root
wget -v https://nginx.org/download/nginx-1.26.2.tar.gz
tar -zxvf nginx-1.26.2.tar.gz
cd nginx-1.26.2
1.2.运行命令：
./configure --prefix=/data/nginx \
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
--with-compat \
--with-pcre-jit

make && make install
1.3.查看端口并通过浏览器访问nginx欢迎界面：
/data/nginx/sbin/nginx -c /data/nginx/conf/nginx.conf
ps -C nginx
查看端口发现80端口上的nginx：
netstat -tupln
使用浏览器访问，在浏览器中输入地址http://192.168.255.136/即可访问到“Welcome to nginx!”页面。
如果访问不了可能是防火墙问题，把防火墙关闭即可。
临时关闭防火墙使用“systemctl stop firewalld”，永久关闭防火墙使用“systemctl disable firewalld”。
sestatus 
systemctl status firewalld
ps -ef | grep -v grep | grep nginx
netstat -tupln
浏览器访问http://192.168.255.136

2.1.下载解压nginx-1.27.3.tar.gz
wget -v https://nginx.org/download/nginx-1.27.3.tar.gz
tar -zxvf nginx-1.27.3.tar.gz
2.2.运行命令
pkill nginx
cd /data/nginx/sbin/
mv nginx nginx.bak

cd /data/
tar -jcvf /opt/nginx.tar.bz2 ./nginx/

cd /root/nginx-1.27.3
./configure --prefix=/data/nginx \
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
--with-compat \
--with-pcre-jit

make && make install

2.3.查看端口
netstat -tupln
cd /data/nginx/sbin
/data/nginx/sbin/nginx -c /data/nginx/conf/nginx.conf
ps -ef | grep nginx

2.4.从http到https：
cd /opt/
（1）生成https证书，使用openssl生成服务端rsa密钥及证书：
openssl genrsa -des3 -out server.key 2048 # 注： 需要2048 server  password：Ccu2024@
（2）创建签名请求证书（csr）
openssl req -new -key server.key -out server.csr
依次填写：
Enter pass phrase for server.key:（刚才的密码Ccu2024@）
Country Name (2 letter code) [XX]:CN
State or Province Name (full name) []:JL
Locality Name (eg, city) [Default City]:CC
Organization Name (eg, company) [Default Company Ltd]:ccu
Organizational Unit Name (eg, section) []:ccu
Common Name (eg, your name or your server's hostname) []:node01
Email Address []:123@qq.com
A challenge password []:Ccu2024@
An optional company name []:ccu

（3）加载ssl支持的nginx并使用私钥时去除口令
cp server.key server.key.bak
openssl rsa -in server.key.bak -out server.key

（4）自动签发证书
openssl x509 -req -days 10240 -in server.csr -signkey server.key -out server.crt

（5）复制证书到nginx conf目录
cp server.crt server.key /data/nginx/conf/

（6）修改nginx.conf配置文件
cd /data/nginx/conf/
vi nginx.conf
在配置文件中的最下面中的server部分，对应部分修改为：
        ssl_certificate      server.crt;
        ssl_certificate_key  server.key;
2.5.浏览器访问nginx欢迎页面，https：
pkill nginx
/data/nginx/sbin/nginx -c /data/nginx/conf/nginx.conf
netstat -tupln
浏览器访问https://192.168.255.136





redis：redis-7.2.4.tar.gz
cd /root/
tar -zxvf redis-7.2.4.tar.gz 
cd redis-7.2.4/
make PREFIX=/data/redis install

cp redis.conf /data/redis/
cd /data/redis/
vi redis_startup.sh
编辑redis_startup.sh内容为如下：
#!/bin/bash
nohup /data/redis/bin/redis-server /data/redis/redis.conf &

/data/redis/bin/redis-server /data/redis/redis.conf
ps -ef | grep redis

bash redis_startup.sh
netstat -tupln
tail -f nohup.out
ps -ef | grep redis

pkill redis
ps -ef | grep redis

vi redis.conf
在redis.conf通过“:?bind”找到“bind 127.0.0.1 -::1”字样观察。
bash redis_startup.sh
ps -ef | grep redis
netstat -tupln
netstat -tupln | grep redis

iptables -A INPUT -p tcp -s 192.168.255.1 --dport 6379 -j ACCEPT
iptables -A INPUT -p tcp -s 0.0.0.0 --dport 6379 -j DROP















dnf -y install mariadb-server mariadb
systemctl enable mariadb
ststemctl start mariadb
vi mysql_bak.sh
编写mysql_bak.sh内容：

```shell
#!/bin/bash

test ! -d /opt/mysql_bak && mkdir -pv /opt/mysql_bak >/dev/null 2>&1
test ! -f /opt/mysql_bak/mysql_backup_Success && touch /opt/mysql_bak/mysql_backup_Success
test ! -f /opt/mysql_bak/mysql_backup_Failed && touch /opt/mysql_bak/mysql_backup_Failed


MYSQL_STATUS=`ps -ef | grep -v grep | grep mysql |wc -l`

if [ "${MYSQL_STATUS}" != "0" ];then
        sleep 5
        /usr/bin/mysqldump -h127.0.0.1 -uroot -pCcu2024@ --all-databases > /opt/mysql_bak/mysqlbackup-$(data +%F_%T).sql
        if [ "$?" == "0" ];then
                echo "MYSQL_$(date +%F) Backup Is Success." >> /opt/mysql_bak/mysql_backup_Success
        else
                echo "MYSQL_$(date +%F) Backup Is Failed." >> /opt/mysql_bak/mysql_backup_Failed
        fi
else
        systemctl start mariadb
fi
```





















