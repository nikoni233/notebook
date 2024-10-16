## mkdir，创建目录

在 Linux 中，创建目录使用 `mkdir` 命令。以下是创建目录的基本步骤：

### 1、创建目录

使用 `mkdir` 命令可以创建一个新的目录。例如，创建名为 `myfolder` 的目录：

```shell
mkdir myfolder
```

### 2、创建多级目录

如果你想一次性创建多级目录，可以使用 `-p` 参数。例如，创建一个嵌套的目录结构 `parent/child`：

```shell
mkdir -p parent/child
```

### 3、查看创建的目录

创建完目录后，你可以使用 `ls` 命令查看是否成功创建：

```shell
ls
```

这会列出当前目录中的所有文件和目录。

---

### touch 创建文件

**示例**：

```bash
# 使用 touch 命令，创建文件
touch shetext.txt
touch shelog.log
touch she.sh
touch shehh.fgls
touch shewhatwhat
# 使用重定向符号 `>` ，创建文件
> shetext.txt
> shewhatwhat
```

---