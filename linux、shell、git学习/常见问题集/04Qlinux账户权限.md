## linux账户权限授权，权限管理

为用户**授权root权限**(系统centos)
```
usermod -aG wheel 用户名
```

（如果给完权限还没有效果，就重启一下。）



把用户从wheel组中**移除**(系统centos)：
```shell
sudo gpasswd -d 用户名 wheel
```



查看**当前用户所属组**：
```shell
groups
```



查看用户**所在的所有组**：
```shell
groups 用户名
```



查看系统数据库，系统中存在的**所有组的信息**。
```shell
getent group
```



用户**验证root权限**
```shell
sudo whoami
sudo -l
#这俩哪个都行
```

