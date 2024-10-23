## VsCode远程ssh连接失败，无法与“192.168.255.130”建立连接。

> Could not establish connection to 192.168.255.130

**发生问题的背景是**，我之前能正常连接我的ubuntu虚拟机，ip是192.168.255.130。我今天把这台虚拟机全删了重新安了遍，给的ip地址不变。用xshell连接正常，用vscode连接就出现问题了。

**分析原因**，vscode还是按照之前的ip地址对应主机指纹，确认连接。因为我虚拟机都删了重做，恰好给的ip地址还与之前重复，这个关系对应不上，无法确认连接，就连接失败了。

连接时发生错误，在下面查看输出中查看报错信息：
`Offending [ECDSA] key in C:\\Users\\34127/.ssh/known_hosts:10.........`

**解决方法**，根据报错信息提示，找到这个 `known_hosts` 文件，然后删除掉刚才连接失败的主机信息。再重新连接即可。

如果你想在VsCode中删除ssh连接记录的话，在这个文件同目录下的 `config`  文件中，删掉指定ip，再回到VsCode中刷新即可。（看着清爽）





---

参考链接：[VsCode远程ssh连接失败：Could not establish connection to XXX_vscode could not establish connection to-CSDN博客](https://blog.csdn.net/u014552102/article/details/140417923)



