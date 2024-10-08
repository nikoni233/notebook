## linux各文件颜色含义

<span style="background:#000000;color:#50BEFF">蓝色：目录(directory)</span>
<span style="background:#000000;color:#FFFFFF">白色：普通文件(ASCII text/empty)</span>
<span style="background:#000000;color:#FF5549">红色：压缩文件(compressed data)</span>
<span style="background:#000000;color:#55FFFF">浅蓝色：链接文件(symbolic link)</span>
<span style="background:#000000;color:#55FF55">绿色：可执行文件(executable)</span>
<span style="background:#000000;color:#FFF549">黄色：设备文件(character special/block special)</span>



 [更多]	[详细内容]([详]linux各颜色文件含义.md)

<span style="background:#000000;color:#FF55FF">粉紫色：套接字(socket)</span>

## mkdir，创建文件夹

在 Linux 中，创建文件夹使用 `mkdir` 命令。以下是创建文件夹的基本步骤：

### 1、创建文件夹

使用 `mkdir` 命令可以创建一个新的文件夹。例如，创建名为 `myfolder` 的文件夹：

```shell
mkdir myfolder
```

### 2、创建多级文件夹

如果你想一次性创建多级文件夹，可以使用 `-p` 参数。例如，创建一个嵌套的目录结构 `parent/child`：

```shell
mkdir -p parent/child
```

### 3、查看创建的文件夹

创建完文件夹后，你可以使用 `ls` 命令查看是否成功创建：

```shell
ls
```

这会列出当前目录中的所有文件和文件夹。

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

## mv、cp、rm，剪切文件(移动文件，重命名)、复制文件、删除文件

### 1、移动文件，移动文件夹（剪切）

**基本用法**：复制一个文件到另一个文件或目录。

```bash
mv 源文件 目标文件/目标目录
```

**示例**：

```bash
mv file1.txt /path/to/destination/
mv oldfile.txt newfile.txt
mv myfolder/ /path/to/destination/
```

**常用选项**：

- **`-i`**：在覆盖现有文件时进行确认。
- **`-u`**：仅移动源文件比目标文件更新的文件。
- **`-v`**：显示详细的操作过程。

**注意事项**：

- **目标名称已存在**：如果目标位置已有同名文件或目录，`mv` 命令会覆盖它。使用 `-i` 选项可以在覆盖之前进行确认。

- **权限**：确保你有权限移动文件或目录。如果需要更高权限，可以使用`sudo`：

	```bash
	sudo mv file1.txt /path/to/destination/
	```

使用 `mv` 命令可以轻松地剪切（移动）文件和目录，并且可以选择性地重命名它们。

>重命名文件：
>
>**基本用法**：
>
>```bash
>mv 旧文件名 新文件名
>```
>
>**示例**：
>
>```bash
>mv oldfile.txt newfile.txt
>```
>
>这个命令将 `oldfile.txt` 重命名为 `newfile.txt`。

### 2、复制文件，复制文件夹

**基本用法**：复制一个文件到另一个文件或目录。

```bash
cp 源文件 目标文件/目标目录
```

**示例**：

```bash
cp file1.txt file2.txt	#复制文件
cp file1.txt /path/to/destination/	#复制文件到指定目录
cp file1.txt file2.txt /path/to/destination/	#同时复制多个文件到目录

cp -r source_folder/ /path/to/destination_folder/	#复制目录（复制文件夹）
```

**常用选项**：

```bash
cp -i 文件1 文件2
```

- **`-i`**：在覆盖文件时进行确认。
- **`-u`**：仅复制源文件比目标文件更新的文件。
- **`-v`**：显示详细的操作过程（verbose mode），显示每个文件的复制过程。

```bash
cp -i 文件1 文件2
```

- **`-r`：**递归复制目录及其内容，使用 `-r` 或 `-R` 选项来递归地复制目录及其内容。
- **`-a`**：归档模式，保留文件的所有属性（包括权限、时间戳等），并递归复制目录。

### 3、删除文件，删除文件夹

**基本用法**：删除文件/目录。

```bash
rm 文件名	#删除文件
rm -r 目录名	#删除目录及目录下的所有文件
```

**示例**：

```bash
rm file1.txt	#删除文件
rm file1.txt file2.txt file3.txt	#删除多个文件
rm -r filefolder	#删除目录及目录下的所有文件
```

**常用选项**：

```bash
cp -i 文件1 文件2
```

- **`-i`**：在删除每个文件之前进行确认。适用于需要防止误删除的情况。
- **`-f`**：强制删除文件，不显示警告或错误信息，通常用于忽略不存在的文件。
- **`-r`** 或 **`-R`**：递归删除目录及其内容。必须小心使用，以避免删除不必要的文件和目录。

- **`-rf`**：结合了 `-r` 和 `-f`，递归删除目录及其内容并强制删除文件。

**其他**：

> **使用 `unlink` 命令**：删除单个文件。
> `unlink` 只能删除单个文件，不能删除目录。
>
> ```bash
> unlink 文件名
> ```
>
> 示例：
>
> ```bash
> unlink file01.txt
> ```

>**删除带有特定模式的文件**：
>
>- 使用通配符删除符合特定模式的文件。例如，删除所有 `.log`文件：
>
>	```bash
>	rm *.log
>	```



---

## vi文本编辑器

`vi` 是 Linux 系统中默认的文本编辑器，通常已经预装。以下是 `vi` 的基本使用方法：

### 1、打开或创建文件

使用 `vi` 命令打开或创建一个文件：

```shell
vi textname01.txt
```

- 如果文件 `textname01.txt` 存在，它会打开文件让你编辑。
- 如果文件不存在，它会创建一个新文件。

### 2、`vi` 的两种模式

- **命令模式**：默认模式，用于执行各种命令，如保存、退出、复制、粘贴等。进入 `vi` 时，处于命令模式。
- **插入模式**：用于输入和编辑文本。

#### 切换模式：

- 从 **命令模式** 进入 **插入模式**：按 `i`。
- 从 **插入模式** 返回 **命令模式**：按 `Esc`。

### 3、编辑文件的基本操作

1. **进入插入模式**：

	- 打开文件后，按 `i` 进入插入模式，此时可以开始编辑文件。

2. **输入文本**：

	- 例如输入：

		```text
		abcd
		测试测试
		1234578sd
		```

3. **保存并退出**：

	- 按 `Esc` 回到命令模式。
	- 输入`:wq`保存并退出：
		- `:w` 保存文件。
		- `:q` 退出 `vi`。
		- `:q!` 强制退出不保存。



---

## cat、more、less、tail、head，文件查看指令

`cat` 命令用于一次性输出文件的**全部内容**，可以将文件的内容直接打印到终端。

`tail` 用于查看文件的**尾部内容**，通常显示文件的最后几行。

`head` 用于显示文件的**前几行**，与 `tail` 显示文件尾部的用法相对应。

`more` 命令用于**分页显示**文件的内容，适合查看大文件。与 `cat` 不同，它不会一次性显示全部内容，而是让用户逐页翻阅。

`less` 是 `more` 的改进版，功能更强大，支持**双向滚动**，可以向前或向后翻阅文件内容。



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

## tar压缩/解压

`tar` 命令是用于创建和解压归档文件的工具。它可以将多个文件和目录打包成一个文件，并支持多种压缩格式。以下是使用 `tar` 命令的基本用法和选项：

### 1. 创建压缩文件

- **创建一个 `.tar` 归档**：打包文件和目录，不压缩。

	```bash
	# tar -cvf 归档名.tar 文件1 文件2 目录
	tar -cvf tarfile.tar file1.txt file2.txt filefolder/
	```

- **创建一个 `.tar.gz` 归档**：使用 gzip 压缩。

	```bash
	# tar -czvf 归档名.tar.gz 文件1 文件2 目录
	tar -czvf tarfile.tar.gz file1.txt file2.txt filefolder/
	```

- **创建一个 `.tar.bz2` 归档**：使用 bzip2 压缩。

	```bash
	# tar -cjvf 归档名.tar.bz2 文件1 文件2 目录
	tar -cjvf tarfile.tar.bz2 file1.txt file2.txt filefolder/
	```

- **创建一个 `.tar.xz` 归档**：使用 xz 压缩。

	```bash
	# tar -cJvf 归档名.tar.xz 文件1 文件2 目录
	tar -cJvf tarfile.tar.xz file1.txt file2.txt filefolder/
	```

### 2. 解压缩文件

- **解压 `.tar` 文件**：

	```bash
	# tar -xvf 归档名.tar
	tar -xvf tarfile.tar
	```

- **解压 `.tar.gz` 文件**：

	```bash
	# tar -xzvf 归档名.tar.gz
	tar -xzvf tarfile.tar.gz
	```

- **解压 `.tar.bz2` 文件**：

	```bash
	# tar -xjvf 归档名.tar.bz2
	tar -xjvf tarfile.tar.bz2
	```

- **解压 `.tar.xz` 文件**：

	```bash
	# tar -xJvf 归档名.tar.xz
	tar -xJvf tarfile.tar.xz
	```

### 2.1. 解压到指定路径

```bash
# tar -xvf 归档文件名 -C 目标目录
# -C：指定解压缩的目标目录（change to directory）。
# -z .gz；-j .bz2；-J .xz；

tar -xzvf tarfile.tar.gz -C /path/to/destination/
```



### 3. 常用选项

- **`-c`**：创建归档（create）。
- **`-x`**：解压归档（extract）。
- **`-v`**：显示详细过程（verbose）。
- **`-f`**：指定归档文件名（file）。
- **`-z`**：使用 gzip 压缩（或解压）。
- **`-j`**：使用 bzip2 压缩（或解压）。
- **`-J`**：使用 xz 压缩（或解压）。

### 4.其他

**`.tar.gz` (gzip 压缩)，描述：**
`gzip` 是一种常见的压缩算法，通常用来减少文件的大小。

 **`.tar.xz` (XZ 压缩)，描述：**

`xz` 提供高压缩比，但压缩和解压速度可能比 gzip 慢。

**`.tar.bz2` (bzip2 压缩)，描述：**

`bzip2` 提供较好的压缩比和速度，但相对 `gzip` 更慢。



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



