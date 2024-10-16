## 查找文件，find，grep

示例：`find`查找，`grep`过滤。
查找 /etc目录下的hosts开头的文件。

```shell
find /etc -type f -name "hosts*"
```

- `find`中：`-type f`只查找文件；`-type d`只查找目录。

```shell
ls -al | grep "hosts"
ls /etc -a | grep "hosts"
```

`ls -al`详细模式：`-a`显示所有(包括目录和以`.`开头的隐藏文件)；`-l`以长格式显示详细信息。
`|`：管道符，将前一个命令的输出传递给下一个命令。
`grep hosts`：过滤出包含 `hosts` 字符串的行。

