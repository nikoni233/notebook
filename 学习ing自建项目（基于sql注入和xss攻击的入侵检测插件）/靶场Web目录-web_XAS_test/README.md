## READ ME

**安装依赖项：**

```shell
npm install express
npm install body-parser
npm install sqlite3

# 需要用mysql就安装下面这个
npm install mysql2
```



**`package.json`：**

```json
{
  "dependencies": {
    "body-parser": "^1.20.3",
    "express": "^4.21.1",
    "mysql2": "^3.11.3",
    "sqlite3": "^5.1.7"
  }
}
```





## 报错

基于 `sqlite3` 库的 `server.js` 使用时报错：

原因是，`sqlite3` 库要调用系统中的 `C++` 标准库中的 `CXXABI_1.3.8` 版本的 `libstdc++.so.6`，但你的系统上没有这个东西。

解决方法，方法一，更新为最新版的 `libstdc++` ；方法二，直接换个新版本系统，一劳永逸。

（其实我当时出这个报错，就是因为我用的系统太老了，直接换个新版本系统，匹配上我用的sqlite3库就行了。不然还要去调整sqlite3和调用的这些libstdc++之间的版本匹配，很麻烦）

>[root@meowcat web_2XAS_test]# node server.js
>/data/AllTest/web_2XAS_test/node_modules/bindings/bindings.js:121
>        throw e;
>        ^
>
>Error: /lib64/libstdc++.so.6: version `CXXABI_1.3.8' not found (required by /data/AllTest/web_2XAS_test/node_modules/sqlite3/build/Release/node_sqlite3.node)
>    at Object.Module._extensions..node (node:internal/modules/cjs/loader:1282:18)
>    at Module.load (node:internal/modules/cjs/loader:1076:32)
>    at Function.Module._load (node:internal/modules/cjs/loader:911:12)
>    at Module.require (node:internal/modules/cjs/loader:1100:19)
>    at require (node:internal/modules/cjs/helpers:119:18)
>    at bindings (/data/AllTest/web_2XAS_test/node_modules/bindings/bindings.js:112:48)
>    at Object.<anonymous> (/data/AllTest/web_2XAS_test/node_modules/sqlite3/lib/sqlite3-binding.js:1:37)
>    at Module._compile (node:internal/modules/cjs/loader:1198:14)
>    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1252:10)
>    at Module.load (node:internal/modules/cjs/loader:1076:32) {
>  code: 'ERR_DLOPEN_FAILED'
>}

