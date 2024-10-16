**目录**

[TOC]

---

## 关于Linux中各文件颜色含义

>蓝色：目录(directory)
>白色：普通文件(ASCII text/empty)
>红色：压缩文件(compressed data)
>浅蓝色：链接文件(symbolic link)
>绿色：可执行文件(executable)
>黄色：设备文件(character special/block special)

 [更多]	[详细内容]([详]linux各颜色文件含义.md)

---

## 查看/更改当前工作目录

> 查看/更改当前工作目录cd、pwd



**更改当前工作目录**：`cd /home/root`

**查看当前工作路径**：`pwd`

---

## 创建文件（创建目录）

>创建文件、创建目录mkdir、touch



**创建目录**：`mkdir myfolder`
**创建文件**：`touch myfile.sh`或者`> myfile.sh`

**查看目录**：`ls`

 [更多]	[详细内容]([详]mkdir创建目录，touch创建文件.md)

---

## 文件管理 - 剪切、复制、删除、重命名

>剪切粘贴、复制、删除、重命名mv、cp、rm



**复制**：`cp file1.txt /path/newfolder/`或者`cp file1.txt file1_cp.txt`

**删除文件**：`rm file1.txt`
**删除目录**：`rm -r myfolder`

**剪切粘贴**：`mv file1.txt /path/newfolder/`
**重命名**：`mv file1.txt fileNewName.txt`

**##【拓展】##**

**强制删除**：`rm -rf myfolder`

 [更多]	[详细内容]([详]mv、cp、rm移动（剪切、重命名），复制，删除.md)

---

## 查看文件内容

>查看文件内容cat、more、less、tail、head



**查看文件内容**：`cat file1.txt`或者`more file.txt`
`cat`一次查看**全部内容**、`more`**分页显示**查看、`tail`从文件**尾部内容**开始查看、`head`从文件**头部内容**开始查看、`less`是支持**双向滚动**查看。

 [更多]	[详细内容]([详]cat、more、less、tail、head查看文件内容.md)

---

## 查看文件属性

>查看文件属性类型file



```shell
# 基本语法：file [文件]
file file01.txt
file file02.zip

# 终端反馈：
file01.txt: ASCII text
file02.zip: Zip archive data, at least v1.0 to extract
```

---

## 编辑文件内容

>vi文本编辑器



**编辑文件内容**：`vi text01.txt`

**`vi` 的三种模式**：命名模式、插入模式、可视模式（块选择模式）。
按 `Esc` 从其他模式退出到命令模式。
按 `i`  进入插入模式。
按 `v`  进入可视模式。
按 `Ctrl + v`  进入块选择模式。

**常用指令**（文件保存退出、光标移动、查找替换、复制粘贴删除、全选删除、撤销重做）：

`:wq` **保存并退出**
`:q!` **强制退出（不保存）**
`:w` **保存但不退出**

`:set number` 或者 `:set nu` **显示行号**
`:set nonumber` 或者 `:set nu!` **隐藏行号**

`gg` **光标移动，移动到文件开头**
`G` **光标移动，移动到文件末尾**
`0` （数字0）**光标移动，移动到行开头**
`$` **光标移动，移动到行末尾**

`/要查找的内容` **向下查找**
`?要查找的内容` **向上查找**
查找后，按 `n` 跳转到下一个匹配，按 `N` 跳转到上一个匹配。

`:s/旧内容/新内容/g` **替换当前行中的内容**
`:%s/旧内容/新内容/g` **替换整个文件中的内容**
`:s/旧内容/新内容/gc` **（每次替换前询问确认）如果需要确认替换，可以在命令中添加 `c`**

`yy` **复制当前行**
`p`  **在光标后粘贴**  **；** `P` **在光标前粘贴**
`dd` **删除当前行**

`:%d` **全选删除**

`u` **撤销**
`Ctrl + r` **重做**，**撤回撤销的操作**

 [更多]	[详细内容]([详]vi文本编辑器.md)

---

## 压缩与解压

>tar、zip压缩解压

**: `tar` 压缩 :**
**创建 `tar` 包**：`tar -cvf tarfile.tar file1.txt file2.txt filefolder/`
**使用 `gzip` 压缩**：`tar -czvf tarfile.tar.gz file1.txt file2.txt filefolder/`
**使用 `bzip2` 压缩**：`tar -cjvf tarfile.tar.bz2 file1.txt file2.txt filefolder/`
**使用 `xz` 压缩**：`tar -cJvf tarfile.tar.xz file1.txt file2.txt filefolder/`

**: `tar` 解压 :**
**解压 `tar` 包**：`tar tarfile.tar`
**解压 `gzip` 压缩**：`tar -xzvf tarfile.tar.gz`
**解压 `bzip2` 压缩**：`tar -xjvf tarfile.tar.bz2`
**解压 `xz` 压缩**：`tar -xJvf tarfile.tar.xz`
**解压到指定路径(以gzip压缩为例)**：`tar -xzvf tarfile.tar.gz -C /path/to/destination/`

**: `zip` 压缩 :**
**压缩一个文件**：`zip file.zip file.txt`
**压缩目录**：`zip -r archive.zip directory_name`

**: `upzip` 解压 :**
**解压**：`unzip file.zip`
**解压到指定路径**：`unzip file.zip -d /path/to/directory`

 [更多]	[详细内容]([详]tar、zip压缩解压.md)

---





























---

## echo指令

```shell
echo "内容" > filename.txt   # 覆盖写入
echo "内容" >> filename.txt  # 追加写入
```



你可以将 `cat` 的输出传递给 `echo`，这样可以显示文件内容：

```shell
echo "$(cat filename.txt)"

```

这里，`$(cat filename.txt)` 会将 `filename.txt` 文件的内容读取并传递给 `echo`，然后 `echo` 会显示这些内容。

---

## 创建链接文件，类似win的快捷方式

> 创建软链接（符号链接）

软链接类似于 Windows 的快捷方式。使用以下命令：

```shell
ln -s /path/to/original /path/to/link
```

- `/path/to/original` 是你要链接的原始文件或目录的路径。
- `/path/to/link` 是你想要创建的链接文件的路径。

---

## 哈哈



