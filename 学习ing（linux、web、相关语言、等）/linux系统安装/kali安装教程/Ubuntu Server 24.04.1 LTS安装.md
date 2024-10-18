## Ubuntu 安装

Ubuntu Server 24.04.1 LTS

**系统安装**

VMware设置：
>虚拟机名称：centos 24.4_01
>处理器：处理器数量：2	每个处理器的内核数量：2
>虚拟机内存：4096MB
>网络连接：使用网络地址转换(NAT)
>最大磁盘大小：50GB

Ubuntu引导安装：
>Keyboard：English (US)
>Choose the base for the installation：Ubuntu Sever (minimized)
>Storage configuration设置自定义硬盘挂载，下面是挂载好的最终结果：
>
>>USED DEVICES
>>DEVICE 														TYPE			SIZE
>>[ /dev/sda													local disk		50.000G	>
>>partition 1				new,BIOS grub spacer								1.000M	>
>>partition 2				new, to be formatted as ext4, mounted at /			40.000G	>
>>partition 3				new, to be formatted as ext4, mounted at /boot		2.048G	>
>>partition 4				new, to be formatted as swap						7.948G	>
>
>Profile configuration：设置登录的用户密码
>Your name：CatsCats
>Your servers name：meowserver
>Pick a username：meowcat
>Choose a password：Cat2024@
>
>SSH configuration：开启SSH服务
>[X]	Install PenSSH server
>
>Featured server snaps：
>microk8s、nextcloud、docker、wormhole、postgresq110、prometheus
>
>然后重启。
>
>重启之后的开机自启中，
>如果卡在
>Starting sysstat-collect.service  system activity accounting
>OK l Finished sysstat-collect.service - system activity accounting tool.
>类似这种情况。
>
>再重启一次就好了。

**系统启动**

> 大部分Linux指令都是互通的。Ubuntu不同于centos，一些指令是不同的。

使用 `root` 权限执行：
```shell
sudo [命令]
```

登入 `root` 账户（不推荐）。系统默认是不设置 `root` 账户密码，无法直接登入 `root` 账户。只能通过 `sudo` 权限命令进入：
```shell
sudo -i
```

更新软件包列表：

```shell
sudo apt update
```

安装软件：

```shell
sudo apt install [软件名]
```

查看本机ip：

```shell
ip ad sh
```

系统默认只开放了一个 `22` 端口，用于 `ssh` 连接：

```shell
PORT   STATE SERVICE
22/tcp open  ssh
```



## 挂载新硬盘到/data目录下

Ubuntu默认用 `ext4` 文件系统，centos默认用 `XFS` 文件系统。

执行要 `root` 权限，`sudo [命令]` 执行，或者使用 `sudo -i` 指令，直接切换 `root` 账户执行。

```shell
#!/bin/bash
#Description:CentOS7 Mount Disk
mkdir /data	#创建data目录，挂载点
pvcreate /dev/sdb	#创建物理卷(PV)
vgcreate vg01 /dev/sdb	#创建卷组(VG)
lvcreate -l 12799 -n lv01 vg01	#创建逻辑卷(LV)
mkfs -t ext4 /dev/mapper/vg01-lv01	#对其逻辑卷格式化，xfs格式
mount /dev/mapper/vg01-lv01 /data	#把格式化后的逻辑卷，手动挂载到/data目录下
#将该挂载添加到开机自启中
echo "/dev/mapper/vg01-lv01 /data ext4 defaults 0 0" >> /etc/fstab
```

**创建软链接到/data目录**

```shell
ln -s /data /home/meowcat
```



## /data目录赋权到当前用户

```shell
sudo chown -R :meowcat /data
# sudo chown -R root /data	
sudo chmod -R g+rw /data
```

结果：

```
meowcat@meowserver:/data/web_XAS_test$ ls -ld /data
drwxrwxr-x 4 root meowcat 4096 Oct 18 15:07 /data
```



