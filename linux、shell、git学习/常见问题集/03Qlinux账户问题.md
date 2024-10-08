## linux系统重的账户问题

### 1、查看系统中已存在的账户

#### 1.1、查看账户

每个用户的信息都保存在 `/etc/passwd` 文件中。

```shell
cat /etc/passwd	#显示系统上所有用户的相关信息
cut -d: -f1 /etc/passwd	#只显示用户名
getent passwd	#不仅可以显示本地用户，还可以显示通过网络服务（如 LDAP）获取的用户
```

##### 文件格式解读：

> <用户名>:<密码占位符>:<用户ID>:<组ID>:<用户描述>:<家目录>:<登录Shell>

**用户名（Username）**：用户在系统中的标识，用户登录时使用的名称。
**密码占位符（Password Placeholder）**：一般为 `x` 或 `*`，表示密码信息。`x`: 表示密码存储在 `/etc/shadow` 文件中；`*`: 表示该用户无法登录（没有有效密码）。
**用户ID（User ID, UID）**：用户的唯一标识符。系统使用 UID 来识别用户。通常，系统用户的 UID 是 0-999，而普通用户的 UID 从 1000 开始。例如，`0`（对于 `root` 用户）。
**组ID（Group ID, GID）**：用户所属的主组的唯一标识符。GID 与 UID 类似，通常也由系统管理。例如，`0`（表示 `root` 组）。
**用户描述（User Description）**：对用户的简单描述，通常用于显示用户信息。这个字段可以为空。
**家目录（Home Directory）**：用户的默认目录，用户登录时会被导向此目录。每个用户通常有自己的家目录。
**登录Shell（Login Shell）**：用户登录后使用的命令行解释器。常见的有 `/bin/bash`、`/bin/sh`、`/sbin/nologin`（表示该用户不能登录）等。

##### 示例：

```text
[root@hostname ~]# cut -d: -f1 /etc/passwd
root
bin
daemon
adm
lp
sync
shutdown
..more..
```

除了root(超级管理员账户)，这些用户大部分是**系统账户**，主要用于**执行系统**和**后台服务的任务**。
通常，**普通用户的 UID 是 1000 以上的**，而**系统用户的 UID 通常在 0 到 999 之间**。
如果想要**查看**系统中的**普通用户**账户，可以根据 **UID (用户标识符) 过滤查询**。

- 下面是示例中各个账户的解读：
	**root**: 超级用户（管理员账户），具有系统的最高权限。
	**bin、daemon、adm**: 这些是系统管理账户，用于系统守护进程或其他系统任务。
	**lp**: 与打印服务相关的账户。
	**sync**: 系统维护使用的账户，常用于同步。
	**shutdown、halt**: 用于执行系统关机和重启的账户。
	**mail**: 处理系统邮件的账户。
	**operator**: 系统操作员账户。
	**games**: 与游戏相关的账户（很少使用）。
	**ftp**: 用于 FTP 服务的账户。
	**nobody**: 一个通用的“无特权”用户，通常用于没有明确身份的服务。
	**systemd-network**: 用于网络管理的账户。
	**dbus**: 用于 D-Bus 消息总线系统的账户。
	**polkitd**: 用于权限管理的账户。
	**tss**: 与 TPM（可信平台模块）服务相关的账户。
	**sshd**: 用于 SSH 服务的账户。
	**postfix**: 用于邮件传输代理（如 Postfix）的账户。
	**chrony**: 用于时间同步服务的账户。
	**mysql**: MySQL 数据库的专用用户账户。

```text
[root@hostname ~]# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
..more..
```

**root** 账户：[`root:x:0:0:root:/root:/bin/bash`]

- **用户名**: root

- **x**: 表示密码存储在 `/etc/shadow` 文件中，通常你看不到密码。
- **UID/GID**: `0:0`，表示 `root` 用户和 `root` 组，具有超级用户权限。
- **说明**: root用户。
- **家目录**: `/root`，root用户的默认家目录。
- **登录 shell**: `/bin/bash`，root 用户可以通过 `bash` shell 登录系统。

**bin** 账户：[`bin:x:1:1:bin:/bin:/sbin/nologin`]

- **用户名**: bin
- **x**: 同样表示密码存储在 `/etc/shadow` 文件中。
- **UID/GID**: `1:1`，这是系统账户，用于管理二进制文件（/bin 目录下的程序）。
- **说明**: bin账户。
- **家目录**: `/bin`。
- **登录 shell**: `/sbin/nologin`，表示此用户无法登录系统。

#### 1.2、查看密码

每个用户的密码信息都保存在 `/etc/shadow` 文件中。

```shell
cat /etc/shadow
```

##### 文件内容格式解读：

> 1:2:3:4:5:6:7:8:9
> 1用户名:2密码:3上次修改密码的时间:4密码最小使用时间:5密码最大使用时间:6密码警告时间:7密码不活动时间:8账户过期时间:9保留字段

**用户名**: 用户的登录名。
**密码**: 用户的加密密码。如果该字段为 `*` 或 `!`，表示该用户无法通过密码登录。
**上次修改密码的时间**: 自 1970 年 1 月 1 日以来的天数，表示用户上次修改密码的时间。
**密码最小使用时间**: 用户在修改密码之前必须等待的天数。
**密码最大使用时间**: 用户在密码过期之前可以使用密码的最大天数。
**密码警告时间**: 密码过期前的天数，系统会警告用户。
**密码不活动时间**: 密码过期后用户账户在被禁用之前的天数。
**账户过期时间**: 自 1970 年 1 月 1 日以来的天数，表示账户何时过期，超过这个日期用户将无法登录。
**保留字段**: 一般为空，保留用于未来的扩展。

##### 示例：

```text
[root@hostname ~]# cat /etc/shadow
root:$6$4ZYL2wmHTtWOTUly$nXSrzKM4DCUvWZCXOGJMIje0KgZcsHWAJzmVLvfQqaPme4VyCwwZNdkyb3RIerIeCIoAXEspO3cCPd59As6DC0::0:99999:7:::
bin:*:18353:0:99999:7:::
daemon:*:18353:0:99999:7:::
adm:*:18353:0:99999:7:::
lp:*:18353:0:99999:7:::
sync:*:18353:0:99999:7:::
shutdown:*:18353:0:99999:7:::
..more..
```

**root** 账户：[`root:$6$4ZYL2wmHTtWOTUly$nXSrzKM4DCUvWZCXOGJMIje0KgZcsHWAJzmVLvfQqaPme4VyCwwZNdkyb3RIerIeCIoAXEspO3cCPd59As6DC0::0:99999:7:::`]

- **密码**: `$6$...` 表示使用 SHA-512 加密的密码，root 账户有有效的密码，能够登录系统。

- **后面的字段**: 包含密码的过期信息、警告期等（详细信息如下）：
	- `0`: 表示密码上次更改的天数（0 表示从未更改）。
	- `99999`: 密码的最大有效天数，99999 表示永不过期。
	- `7`: 密码的警告期（在过期前 7 天会提示用户更改密码）。



**bin** 账户及其他系统管理服务账户（如 `daemon`、`adm`、`lp` 、 `sync`和`shutdown`等等）：
[`bin:*:18353:0:99999:7:::`]

- **密码**: `*` 表示这些账户的密码被锁定，无法使用密码登录系统。

- **其他字段**: 也包含了与 root 账户相同的过期信息字段。

---

### 2、创建新账户

1. **创建新用户**：

	```shell
	useradd 用户名
	useradd -m 用户名	#新用户创建的同时，自动创建该用户的家目录/home/用户名/
	```

	将`用户名`替换为你想要创建的用户名。
	默认情况下，执行[`useradd 用户名`]，某些系统会自动为新用户创建家目录。(用户添加的配置文件路径`/etc/default/useradd`)

2. **设置用户密码**：

	```shell
	passwd 用户名
	```

	系统会提示你输入并确认新密码。

3. **可选：为用户添加到某个组**（例如，`sudo`组）：

	```shell
	usermod -aG sudo 用户名
	```

4. **检查新用户是否创建成功**：

	```shell
	cat /etc/passwd | grep 用户名
	```

---

### 3、删除账户

1. **以root用户身份登录**：确保你以root用户身份登录，或使用具有`sudo`权限的用户。

2. **删除用户**： 使用以下命令删除用户`用户名`：

	```shell
	userdel 用户名
	```

3. **可选：删除用户的家目录**： 如果你还想删除该用户的家目录及其文件，可以添加`-r`选项：

	```shell
	userdel -r 用户名
	```

	- `-r` ，删除用户全部的文件，操作无法撤销。

4. **确认用户已删除**： 你可以运行以下命令来确认用户是否已成功删除：

	```shell
	cat /etc/passwd | grep 用户名
	```

	如果没有输出，说明用户已经被删除成功。

---

### 4、禁用root账户，或更改root账户名称

#### 4.1、禁用root账号

1. **锁定root账号**：

	```shell
	passwd -l root
	```

	这条命令会锁定root账号，使其无法登录。

2. **验证是否禁用成功**： 你可以运行以下命令来检查root账号的状态：

	```shell
	passwd -S root
	```

	输出中应该显示“L”表示账号已被锁定。

#### 4.2、更改root账号名称

1. **更改root账号名称**： 

	```
	usermod -l 对于root新更改的账户名 root
	```

2. **更改家目录名称**（可选）： 如果你也想更改root用户的家目录，可以使用以下命令：

	```
	usermod -d /root_new -m 对于root新更改的账户名
	```

	这将把root用户的家目录更改为`/root_new`。

3. **更新相关配置**： 如果有任何系统服务依赖于root用户名，确保相应地更新这些配置。

4. **重启系统**（可选）： 更改完毕后，建议重启系统，以确保所有更改生效。

---

### 疑难杂症：

#### Q1、把root账户禁用了，没有其他账户登入系统怎么办？

1. **进入单用户模式**：

- 在系统启动时，选择进入GRUB菜单（通常在启动时按`Shift`或`Esc`键）。
- 选择一个内核版本并按`e`键进行编辑。
- 找到以`linux`开头的行，添加`single`或`init=/bin/bash`到行尾，然后按`Ctrl + X`或`F10`启动。
- 这将使系统以单用户模式启动，并提供一个root shell。

2. **解锁root账号**：一旦你进入单用户模式，输入以下命令解锁root账号：

```shell
passwd -u root
```

3. **重启系统**：输入`reboot`命令重新启动系统。

