#!/bin/bash
#rocky linux 8.10
#shell：
#1.收集网络信息（IP内网，netmask子网，gateway）。
#2.收集用户与用户组信息（可登录系统的用户和用户组）
#3.收集当前系统运行服务和端口号
#4.收集当前系统1-3分钟，流量数据（both双向的）
#
#
#
# 1.收集网络信息（IP内网，netmask子网，gateway）。
echo -e "### IP_addr: ###\n$(ip -4 addr show | grep inet | awk '{print $2}' | cut -d/ -f1)"
echo -e "### Netmask: ###\n$(ifconfig | grep -w "inet" | awk '{print $4}')"
echo -e "### Gateway: ###\n$(ip route | grep default | awk '{print $3}')"
echo ""
#
# 2.收集用户与用户组信息（可登录系统的用户和用户组）
echo "### Login-Capable Users: ###"
cat /etc/passwd | awk -F: '$3 == 0 || $7 ~ /bash|sh/ && $3 > 1000 {print $1}'
echo ""
# 用户组信息
echo "### User Group: ###"
getent group | cut -d: -f1
echo ""
#
# 3.收集当前系统运行服务和端口号
echo "### Listening Port: ###"
ss -tuln | awk '{print $1, $2, $5}'
echo ""
# 获取正在运行的服务
echo "### Currently Running Services: ###"
systemctl list-units --type=service --state=running |grep ".service"
echo ""
#
sleep 5
#
# 4.收集当前系统1-3分钟，流量数据（both双向的）
echo "### Monitor Network Traffic For Three Mins: ###"
sar -n DEV 1 180 | grep ens33
echo ""
echo "Finished."


