## 目录

linux各文件颜色含义
改变当前工作目录cd
查看当前工作路径pwd
创建文件、创建目录mkdir、touch
剪切粘贴、复制、删除、重命名mv、cp、rm
查看文件内容cat、more、less、tail、head
查看文件属性类型file
vi文本编辑器
tar压缩/解压













## linux各文件颜色含义

>蓝色：目录(directory)
>白色：普通文件(ASCII text/empty)
>红色：压缩文件(compressed data)
>浅蓝色：链接文件(symbolic link)
>绿色：可执行文件(executable)
>黄色：设备文件(character special/block special)

 [更多]	[详细内容]([详]linux各颜色文件含义.md)



---

## 改变当前工作目录、查看路径cd、pwd

**改变当前工作目录**：`cd /home/root`

**查看当前工作路径**：`pwd`

---

## 创建文件、创建目录mkdir、touch

**创建目录**：`mkdir myfolder`
**创建文件**：`touch myfile.sh`或者`> myfile.sh`

**查看目录**：`ls`

 [更多]	[详细内容]([详]mkdir创建目录，touch创建文件.md)



---

## 剪切粘贴、复制、删除、重命名mv、cp、rm

**复制**：`cp file1.txt /path/newfolder/`或者`cp file1.txt file1_cp.txt`

**删除文件**：`rm file1.txt`
**删除目录**：`rm -r myfolder`

**剪切粘贴**：`mv file1.txt /path/newfolder/`
**重命名**：`mv file1.txt fileNewName.txt`

**##【拓展】##**

**强制删除**：`rm -rf myfolder`

 [更多]	[详细内容]([详]mv、cp、rm移动（剪切、重命名），复制，删除.md)



---

## 查看文件内容cat、more、less、tail、head

**查看文件内容**：`cat file1.txt`或者`more file.txt`
`cat`一次查看**全部内容**、`more`**分页显示**查看、`tail`从文件**尾部内容**开始查看、`head`从文件**头部内容**开始查看、`less`是支持**双向滚动**查看。

 [更多]	[详细内容]([详]cat、more、less、tail、head查看文件内容.md)

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

## file指令，查看文件属性类型

```bash
# file 文件
file file01.txt
file file02.tar
```



---



---

## pwd，查看文件路径

查看**当前工作目录**的路径：
`pwd`（print working directory）命令会输出你当前所在的目录的完整路径。

查看**其他**路径：
`ls -l /data`命令，查看路径中的详细信息（如文件权限、所有者等）。



---

## 创建链接文件，类似win的快捷方式

### 创建软链接（符号链接）

软链接类似于 Windows 的快捷方式。使用以下命令：

```shell
ln -s /path/to/original /path/to/link
```

- `/path/to/original` 是你要链接的原始文件或目录的路径。
- `/path/to/link` 是你想要创建的链接文件的路径。



---

## 哈哈



