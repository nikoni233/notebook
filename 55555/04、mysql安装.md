## mysql安装

文件：MySQL8.4.2_install.tar.bz2

1. **上传**，**解压**，获得目录文件**`MySQL8.4.2_install`**
2. 进入该目录，查看文件**`my.cnf`**、**`mysql_install.sh`**、**`mysql-8.4.2-linux-glibc2.17-x86_64.tar.xz`**
3. 把这三个文件转移到**`/root`**目录下，执行命令**`mv * ../`**
4. **运行脚本**，执行命令**`bash mysql_install.sh `**
5. **测试mysql运行**，执行命令**`mysql -u root -p`**
  (password密码为，安装mysql时提示信息倒数第二条，每个人安装时的默认密码都不一样)
  (例如：2024-09-19T15:07:09.693550Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: **Faui/!pnc7ah**)



---

## mysql初始命令调试

```mysql
--mysql -u root -p
--password:

show databases;
alter user 'user'@'localhost' indentified by '123456';
flush privileges;

exit;
```

`/etc/init.d/mysqld restart`

```mysql
--mysql -uroot -p123456
show databases;

exit;
```

`netstat -tupln`
cd /etc/rc.d/
ls
chmod +x rc.local
ls
echo “etc/init.d/mysqld start” >> rc.local
ls
more rc.local
netstat -tupln
mysql -V



---

## mysql安装整合包的详细拆解：

文件：**`my.cnf`**、**`mysql_install.sh`**、**`mysql-8.4.2-linux-glibc2.17-x86_64.tar.xz`**

#### my.cnf文件：

```text
[mysqld]
user = mysql
port = 3306
basedir = /data/mysql/mysqlbase/mysql-8.4.2
datadir = /data/mysql/mysqldata
socket  = /data/mysql/mysqlbase/mysql.sock
pid_file = dms-mysql.pid
skip_name_resolve = 1
open_files_limit = 65535
default_time_zone = "+8:00"

#log
slow_query_log=on
slow_launch_time=1
slow_query_log_file=/data/mysql/mysqllog/mysql-slow.log
log_timestamps=SYSTEM
log_error = /data/mysql/mysqllog/error_log/error.log
log_slow_extra = 1
long_query_time = 0.1
log_queries_not_using_indexes = 1
log_throttle_queries_not_using_indexes = 60
min_examined_row_limit = 100
log_slow_admin_statements = 1
log_slow_slave_statements = 1
log_bin = /data/mysql/mysqllog/mybinlog
binlog_format = ROW
sync_binlog = 1 
binlog_cache_size = 4M
max_binlog_cache_size = 2G
max_binlog_size = 1G
binlog_rows_query_log_events = 1
binlog_expire_logs_seconds = 604800

#myisam settings
key_buffer_size = 32M
myisam_sort_buffer_size = 128M

#optimization
lock_wait_timeout = 3600
open_files_limit    = 65535
back_log = 1024
group_concat_max_len=204800
max_connections=50000
max_connect_errors=1000
max_allowed_packet=1024M
innodb_file_per_table=1
innodb_buffer_pool_size=1024M
table_open_cache = 1024
table_definition_cache = 1024
thread_stack = 512K
sort_buffer_size = 4M
join_buffer_size = 4M
read_buffer_size = 8M
read_rnd_buffer_size = 4M
bulk_insert_buffer_size = 64M
thread_cache_size = 768
interactive_timeout = 600
wait_timeout = 600
tmp_table_size = 32M
max_heap_table_size = 32M

#character
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci
init-connect='SET NAMES utf8mb4'

#innodb settings
transaction_isolation = REPEATABLE-READ
innodb_buffer_pool_size = 11264M
innodb_buffer_pool_instances = 4
innodb_log_buffer_size = 32M
innodb_log_file_size = 2G
innodb_log_files_in_group = 3
innodb_max_undo_log_size = 4G
innodb_io_capacity = 4000
innodb_io_capacity_max = 8000
innodb_open_files = 65535
innodb_flush_method = O_DIRECT
innodb_lru_scan_depth = 4000
innodb_lock_wait_timeout = 10
innodb_rollback_on_timeout = 1
innodb_print_all_deadlocks = 1
innodb_online_alter_log_max_size = 4G

[client]
default-character-set=utf8mb4
port = 3306
socket = /data/mysql/mysqlbase/mysql.sock

[mysqldump]
quick

[mysql]
no_auto_rehash
loose-skip-binary-as-hex
```



#### mysql_install.sh文件：

```shell
#!/bin/bash
#Description : MySQL8.4.2 Install Script 
#Author      : hc
#Version     : 1.0

OSVER=`rpm -qi centos-release | grep -i 'version ' | awk -F":" '{print $2}' | xargs`
if [ "${OSVER}" != "7" ];then
	echo "Must Be Toot CentOS7."
	exit 1
fi

function MySQL_User(){
    id mysql >/dev/null 2>&1
    if [ "$?" != "0" ];then
	useradd -s /sbin/nologin mysql >/dev/null 2>&1
    fi	
}

function Create_DIR(){
    DIRECTORY=("/data" "/data/mysql" "/data/mysql/mysqlbase" "/data/mysql/mysqllog" "/data/mysql/mysqldata")
    for i in "${DIRECTORY[@]}"
    do
    	if [ ! -d "${i}" ];then
        	mkdir -p "${i}"
    	fi
    done
}

function INSTALL(){
    test ! -f /root/mysql-8.4.2-linux-glibc2.17-x86_64.tar.xz && exit 1
    test ! -f /root/my.cnf && exit 1
    chown -R mysql:mysql /data
    tar -xvf /root/mysql-8.4.2-linux-glibc2.17-x86_64.tar.xz -C /data/mysql/mysqlbase/
    mv /data/mysql/mysqlbase/mysql-8.4.2-linux-glibc2.17-x86_64 /data/mysql/mysqlbase/mysql-8.4.2
    /data/mysql/mysqlbase/mysql-8.4.2/bin/mysqld --initialize --user=mysql --basedir=/data/mysql/mysqlbase/mysql-8.4.2/ --datadir=/data/mysql/mysqldata/
    
    if [ "$?" != "0" ];then
	echo "An error occurs during the installation of the MySQL Database Service."
	exit 1
    fi

    if [ -f /etc/my.cnf ];then
	rm -rf /etc/my.cnf && mv /root/my.cnf /etc/
    fi

    if [ -f /etc/init.d/mysqld ];then
	rm -rf /etc/init.d/mysqld
    else
	cp /data/mysql/mysqlbase/mysql-8.4.2/support-files/mysql.server /etc/init.d/mysqld
    fi

    if [ ! -f /usr/bin/mysql ];then
	ln -s /data/mysql/mysqlbase/mysql-8.4.2/bin/mysql /usr/bin/mysql
    fi
}

function MYSQL_LOG(){
    MYSQL_LOG=("/data/mysql/mysqllog/error_log" "/data/mysql/mysqllog/mybinlog")
    for j in "${MYSQL_LOG[@]}"
    do
	if [ ! -d "${MYSQL_LOG}" ];then
		mkdir -p ${j}
	fi
    done    

    test ! -f /data/mysql/mysqllog/error_log/error.log && touch /data/mysql/mysqllog/error_log/error.log    
    test ! -f /data/mysql/mysqllog/mysql-slow.log && touch /data/mysql/mysqllog/mysql-slow.log
    cd /data/mysql/ && chown -R mysql:mysql mysqllog 
}

function MYSQL_START(){
    /etc/init.d/mysqld start 
    sleep 5
    if [ "$?" != "0" ];then
	echo "MySQL Service Running Is Error."
	exit 0
    else
	echo "MySQL Service Running Is Successful."
    fi
}

main (){
MySQL_User
Create_DIR
INSTALL
MYSQL_LOG
MYSQL_START
}
main
```



#### mysql-8.4.2-linux-glibc2.17-x86_64.tar.xz文件：

`mysql-8.4.2-linux-glibc2.17-x86_64.tar.xz`