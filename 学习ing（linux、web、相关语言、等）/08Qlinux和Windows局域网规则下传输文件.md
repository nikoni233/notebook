## 局域网规则下，linux和windows文件传输

---

### linux和Windows做服务端，发起方：

```shell
python -m http.server 7979
```

**报错：**`/bin/python: No module named http`，这通常是因为你的Python版本是Python 2.x。而在Python 3.x中，`http.server`模块被包含在标准库中。

**解决方法：**安装`python3`，运行指令`python3 -m http.server 7979`。



---

### linux和Windows做客户端，接受方：

**linux：**

```shell
wget http://192.168.255.128:7979/haha.txt
```

**Windows：**

```shell
curl http://192.168.255.128:7979/haha.txt -o haha.txt
```

