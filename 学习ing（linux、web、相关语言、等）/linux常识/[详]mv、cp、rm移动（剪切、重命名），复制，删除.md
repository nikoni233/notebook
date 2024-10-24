## 文件基础操作：剪切、复制、删除、重命名（mv、cp、rm）

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

