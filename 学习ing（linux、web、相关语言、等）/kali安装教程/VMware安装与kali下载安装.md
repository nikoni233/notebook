## VMwareWorkstation17下载安装



### 1、百度一下：vmware官网下载



### 2、VMWare序列化

> VMware激活密钥（通用批量永久激活许可）

```text
17:	4A4RR-813DK-M81A9-4U35H-06KND
	JU090-6039P-08409-8J0QH-2YR7F

16:	ZF3R0-FHED2-M80TY-8QYGC-NPKYF
    FNEW8-ZY7TY-Y1Z7W-QZQCR-NZZ5V
    XJKN8-KM9KX-H1Y91-FQPVX-QFXUZ

15:	FC7D0-D1YDL-M8DXZ-CYPZE-P2AY6

12:	ZC3TK-63GE6-481JY-WWW5T-Z7ATA

10:	1Z0G9-67285-FZG78-ZL3Q2-234JG
```









---

## Kali镜像下载

###  1.Kali官网

https://www.kali.org/downloads/

###  2.下载Kali镜像

kali下载地址：https://www.kali.org/get-kali/#kali-platforms







---

## Kali安装

### 1.kali安装到VM

创建新的虚拟机
新建虚拟机引导
		--自定义(高级) >下一步
		>下一步
		--稍后安装操作系统  >下一步
		--客户机操作系统：Linux；版本：Debian 10.x64位  >下一步
		--虚拟机命名(不能带中文)  >下一步
		--处理器数量：2；每个处理器的内核数量：2  >下一步
		--虚拟机的内存：4096  >下一步
		--网络连接：使用网络地址转换（NAT  >下一步
		--I/O控制器类型：LSI Logic  >下一步
		--虚拟机磁盘类型：SCSI  >下一步
		--最大磁盘大小：50GB；将虚拟磁盘拆分成多个文件  >下一步
		>下一步
		--自定义硬件>新CD/DVD(IDE)>使用ISO映像文件(kila镜像)  >下一步
		>完成		<u>[出现问题01：虚拟机安装centos安装提示operating system not found错误。见疑难杂症]</u>

### 2.kali安装初始化

​		--选择“Graphical instal”
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
​					KALI LINUX
​		Kali Linux installer menu (BIOS mode)
Graphical instal [√]
Instal
Aduanced options
Accessible dark contrast installer menu
Install with speech synthesis

Press a key,otherwise speech synthesis will bestarted in 28 seconds...
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-        
		--select a language：选择“中文”   >continue
        	--选择您的位置“中国”  >继续
        	--配置键盘“汉语”  >继续
        	>自动配置中，等待完成		<u>[出现问题02：配置网络>您的网络可能并未使用DHCP协议。见疑难杂症]</u>
        	--配置网络：主机名：kali  >继续
        	--配置网络：域名：kali  >继续
        	--设置用户和密码：新用户的全名：kali  >继续
        	--设置用户和密码：您的账号的用户名：kali  >继续
        	--设置用户和密码：新用户密码：kali  >继续
        	>自动配置中，等待完成
        	--对磁盘进行分区：“向导-使用整个磁盘”  >继续
        	--选择要分区的磁盘：“SCSI3(0,0,0)(sda)-53.7GB VMware,VMware Virtual S”  >继续
        	--分区方案：“将虽有文件放在同一个分区中”  >继续
        	>继续
        	--将改动写入磁盘？“是”  >继续
        	>自动配置中，等待完成
        	--软件选择，默认即可  >继续
        	--安装GRUB启动引导器：“是”  >继续
        	--安装GRUB启动器：“/dev/sda”  >继续
        	>自动配置中，等待完成
        	>完成







---

## kali中用户权限

```text
sudo su		【切换到root用户，也就是切换到超级权限用户，拥有最高权限】
adduser derry	【创建derry新用户，紧接着填写 密码】
passwd derry	【修改此derry用户的密码】
usermod -aG sudo	【derry把derry用户加入到sudo组】
groups derry 	【查看加入到了那些组】
su derry 	【切换到新用户derry】
```



























---

## 疑难杂症

### 01：虚拟机安装centos安装提示operating system not found错误

虚拟机安装centos安装提示operating system not found错误，解决方案：
https://www.bilibili.com/video/BV1xN411w7gR/



### 02：配置网络>您的网络可能并未使用DHCP协议，kali没网络也同理

- **可能原因一：是vmware dhcp service服务未开启**

	​	实体机：win+r打开运行输入services.msc
	​	找到vmware 服务都打开
	​	就可以了

	原文链接：https://blog.csdn.net/lxwssjszsdnr_/article/details/118488211

- **可能原因二：vmware还原默认设置**

	​	打开VMware，找到并点开编辑，选择并点开虚拟网络编辑器
	​	选择还原默认设置
	​	弹出选项选择是，等待完成即可

	原文链接：https://blog.csdn.net/buxiuhuannian/article/details/127475994

	

### 03：原视频教程

https://www.bilibili.com/video/bv12j41177c5









---

