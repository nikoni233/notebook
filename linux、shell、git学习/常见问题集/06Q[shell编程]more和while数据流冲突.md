### more和while数据流冲突，改用cat就好了。

#### 实例：

```shell
[root@meowcat auto_shell]# bash test.sh 
IP is 192.168.255.1.ldldld
IP is 192.168.255.129.ldldld
IP is 192.168.255.130.ldldld
IP is 192.168.255.131.ldldld
HAHAHAHAHAHAHAHHAHAHAHAHHAHA
IP is 192.168.255.1.ldldld
AHAHAHHAHAHAHHAHAHAHHAHAHAHAH
Sep 25 09:55:20

[root@meowcat auto_shell]# cat test.sh 
#!/bin/bash
FAILCOUNT=7
WHITELIST_FILE="whiteip.conf"
WHITELIST_FILE_DEF="192.168.255.1"
LOGDIR=/var/log
LOGFILE="logipdeny.log"
LOG_NAME=secure
WHITELIST=$(cat ${WHITELIST_FILE})
DENYS=$(more ${LOGDIR}/${LOG_NAME} | grep -i "failed" | awk -F "from" '{print $2}' | awk '{print $1}' | sed '/^$/d' | sort | uniq -c | awk '$1 >= $FAILCOUNT {print $1, $2}')
DENYS_NUM=$(echo "$DENYS" | wc -l)
############################
echo "$DENYS" | while read VISITS IP; do
    echo "IP is $IP.ldldld"
done
echo "HAHAHAHAHAHAHAHHAHAHAHAHHAHA"
echo "$DENYS" | while read VISITS IP; do
    LATEST_DATE=$(more ${LOGDIR}/${LOG_NAME} | grep -i "failed" | grep "from" | grep "$IP" | awk '{print $1, $2, $3}' | tail -n 1)
    echo "IP is $IP.ldldld"
    echo "$LATEST_DATE" >> LATEST_DATE.tmp
done
echo "AHAHAHHAHAHAHHAHAHAHHAHAHAHAH"
cat LATEST_DATE.tmp
[root@meowcat auto_shell]# 
```

##### 问题分析

1. **输入流的读取**： 使用 `while read` 循环时，循环会从输入流中逐行读取数据。如果输入流被关闭，后续的循环可能无法继续读取。
2. **`more` 和 `cat` 命令的使用**： 在你的脚本中多次使用 `more` 和 `cat` 命令读取相同的日志文件。`more` 会消耗输入流，导致后续的 `while read` 无法获取数据。

##### 解决方法

1. **改用 `cat` 替代 `more`**： 将 `more` 替换为 `cat`，因为 `cat` 不会影响输入流。代码修改如下：

	```shell
	LATEST_DATE=$(cat ${LOGDIR}/${LOG_NAME} | grep -i "failed" | grep "from" | grep "$IP" | awk '{print $1, $2, $3}' | tail -n 1)
	```

	