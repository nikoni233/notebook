# typora安装与破解



## 方法一：序列号生成（推荐）

> typro官网下载最新版本，并安装
> 获取激活工具
>
> 可以自行拉取代码（https://github.com/DiamondHunters/NodeInject_Hook_example）编译，或者使用以下地址：
> 已编译好的版本：详见百度盘
>
> 把 NodeInject-windows 压缩包中的两个 exe 解压到 typora 的安装目录，比如 D:\Program Files\Typora
> 压缩包如下：
> 放入 typora 的安装目录：
>
> 运行 cmd 跳转到安装目录，输入 node_inject.exe 回车即可自动处理，然后输入 license-gen.exe 回车可得到序列号



```text
# 自动配置相关文件
.\node_inject.exe

# 序列号生成
.\license-gen.exe
```



> Email可以随意输入一个，并复制上述生成的序列号，点击激活即可





## 方法二：使用最后一个免费的beta版本，延迟使用时间（要改注册表）

> 这种方法适用于Typora的最后一个Beta版（0.11.18）,这个版本还是免费的，但是系统会进行检测要求升级才能使用，通过修改注册表它可以让你延长Typora的试用期限，并且防止它检测到你的修改。具体步骤如下：
>
> - 打开注册表编辑器。你可以按Windows+R键，输入regedit，然后点击确定。
> - 在注册表编辑器中，找到“计算机\HKEY_CURRENT_USER\SOFTWARE\Typora”这个路径。
> - 修改IDate的值，把它改成一个未来的日期，比如2030-01-01。这样就可以延长Typora的试用期限
> - 右键点击Typora这个文件夹，选择“权限”选项。在弹出的窗口中，选中Administrators这个用户组，然后把所有的权限都设置为“拒绝”。这样就可以阻止Typora检测到你修改了注册表。
> - 关闭注册表编辑器，重新打开Typora。你就可以继续使用免费版了。
>
> 注意：建议你在Typora的偏好设置里，把自动更新关闭。这样就可以避免被强制升级到付费版。





## 方法三：替换winmm.dll文件（只能向下兼容）

> 文件见百度盘



