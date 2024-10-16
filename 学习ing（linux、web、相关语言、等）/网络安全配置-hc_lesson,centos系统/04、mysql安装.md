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
alter user 'user'@'localhost' indentified by 'root123456';
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





---

## 疑难杂症：mysql的root密码忘了咋办？

### 重置MySQL的root密码（使用单用户模式）

1. **停止MySQL服务**：

	```shell
	systemctl stop mysqld
	```

2. **启动MySQL服务，跳过网络连接与授权表**： 编辑MySQL的配置文件`/etc/my.cnf`，在`[mysqld]`部分添加以下内容：

	```shell
	skip-grant-tables
	skip-networking
	```

	保存并关闭文件后，重新启动MySQL服务：

	```shell
	systemctl restart mysqld
	```

3. **登录MySQL并重置密码**： 现在你应该可以登录MySQL：

	```shell
	mysql -u root
	```

	然后执行以下SQL命令来重置密码：

	```shell
	FLUSH PRIVILEGES;
	ALTER USER 'root'@'localhost' IDENTIFIED BY 'root123456';
	```

4. **移除`skip-grant-tables`和`skip-networking`**： 重新编辑`/etc/my.cnf`，删除这两行设置，然后重启MySQL服务：

	```shell
	systemctl restart mysqld
	```



---

## mysql的基本指令操作

### 1.对数据库操作

#### - 查看所有数据库

```sql
SHOW DATABASES;
```



#### - 创建数据库

```sql
CREATE DATABASE database_name;
```



#### - 删除数据库

```sql
DROP DATABASE database_name;
```



### 2.对数据库中的表操作

#### - 查看表

##### - 查看表结构

显示表的结构，包括列名、数据类型、是否可以为 NULL、键类型、默认值等信息。
用于查看表的结构，帮助了解表的设计和数据类型。

```sql
DESCRIBE table_name;
```

示例：

```sql
DESCRIBE users;
```

示例输出：

```sql
Field      | Type         | Null | Key | Default | Extra
-----------|--------------|------|-----|---------|---------
id         | int          | NO   | PRI | NULL    | auto_increment
username   | varchar(255) | NO   | UNI | NULL    | 
password   | varchar(255) | NO   |     | NULL    | 
```



##### - 列出所有的表

列出当前选择的数据库中的所有表。
用于查看当前数据库中有哪些表。

基本语法：

```sql
SHOW TABLES;
```

示例：

```sql
SHOW TABLES;
```

示例输出：

```sql
Tables_in_my_database
----------------------
users
orders
products
```

#### - 创建表

基本语法：

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    ...
);
```

示例：

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

#### - 删除表

```sql
DROP TABLE table_name;
```

#### - 修改表

基本语法：

```sql
ALTER TABLE table_name ADD column_name datatype;
```

示例：

```sql
ALTER TABLE users ADD age INT;
```

### 3.对表中的数据操作

#### - 查询数据

基本语法：

```sql
SELECT * FROM table_name;           -- 查询所有数据
SELECT column1, column2 FROM table_name;  -- 查询特定列
```

示例：

```sql
SELECT * FROM users;
```

#### - 插入数据

基本语法：

```sql
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
```

示例：

```sql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
```

#### - 更新数据

基本语法：

```sql
UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
```

示例：

```sql
UPDATE users SET email = 'alice_new@example.com' WHERE name = 'Alice';
```

#### - 删除数据

基本语法：

```sql
DELETE FROM table_name WHERE condition;
```

示例：

```sql
DELETE FROM users WHERE name = 'Alice';
```



### 4.新建mysql账户，指定数据库赋权

#### （1）创建数据库

使用 `CREATE DATABASE` 命令创建一个新数据库：

```sql
CREATE DATABASE new_database_name;
```

- `new_database_name`是你的新数据库名

#### （2）创建新用户

使用 `CREATE USER` 命令创建一个新用户。您可以指定用户的主机和密码：

```sql
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';
```

- `new_user`是你的新用户名
- `password`是你的新用户名的密码

#### （3）授权

使用 `GRANT` 命令将对新数据库的所有权限赋予新用户：

```sql
GRANT ALL PRIVILEGES ON new_database_name.* TO 'new_user'@'localhost';
```

#### （4）刷新权限

为了确保更改生效，可以使用以下命令刷新权限：

```sql
FLUSH PRIVILEGES;
```

在 MySQL 中，`FLUSH PRIVILEGES;` 命令用于重新加载授权表的权限。这意味着，如果你在数据库中对用户权限进行了更改（例如，添加、删除或修改用户权限），那么你需要运行这个命令，以便 MySQL 重新读取这些更改。

#### （5）查看用户的权限

如果需要查看权限是否已正确设置，可以使用以下命令：

```sql
SHOW GRANTS FOR 'new_user'@'localhost';
```

- `new_user`是你的新用户名



### 5.一个简单的示例

```sql
-- 1. 登录 MySQL
mysql -u root -p

-- 2. 创建数据库
CREATE DATABASE my_database;  -- 创建名为 my_database 的新数据库

-- 3. 选择数据库
USE my_database;  -- 选择 my_database 数据库

-- 4. 创建表
CREATE TABLE users (                -- 创建名为 users 的新表
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 主键，自动递增
    name VARCHAR(100),               -- 用户名，最大长度100
    email VARCHAR(100)               -- 用户邮箱，最大长度100
);

-- 5. 插入数据
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');  -- 插入一条用户数据
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');      -- 插入另一条用户数据
INSERT INTO users (name, email) VALUES ('Tom', 'Tom@example.com');      -- 插入另一条用户数据

-- 6. 查询数据
SELECT * FROM users;  -- 查询 users 表中的所有数据

-- 7. 更新数据
UPDATE users SET email = 'alice_new@example.com' WHERE name = 'Alice';  -- 更新 Alice 的邮箱

-- 8. 删除数据
DELETE FROM users WHERE name = 'Bob';  -- 删除 Bob 的数据

-- 9. 查看表结构
DESCRIBE users;  -- 查看 users 表的结构

-- 10. 查看所有表
SHOW TABLES;  -- 查看当前数据库中的所有表

-- 11. 查看某个表中的所有数据
SELECT * FROM users;  -- 再次查询 users 表中的所有数据

-- 12. 创建新用户
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'new_password';  -- 创建名为 new_user 的新用户

-- 13. 授权
GRANT ALL PRIVILEGES ON my_database.* TO 'new_user'@'localhost';  -- 授权 new_user 对 my_database 的所有权限

-- 14. 刷新权限
FLUSH PRIVILEGES;  -- 刷新权限，使更改生效

-- 15. 查看权限
SHOW GRANTS FOR 'new_user'@'localhost';  -- 查看 new_user 的权限

-- 16. 删除这个新用户
DROP USER 'new_user'@'localhost';  -- 删除 new_user 用户

-- 17. 删除表
DROP TABLE users;  -- 删除 users 表

-- 18. 删除这个新数据库
DROP DATABASE my_database;  -- 删除 my_database 数据库
```

### 6.查看MYSQL所有用户

查询`mysql.user` 表，该表存储了 MySQL 用户的信息。

```sql
SELECT User, Host FROM mysql.user;
```

