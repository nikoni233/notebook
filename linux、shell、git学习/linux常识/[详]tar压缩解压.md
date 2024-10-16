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

