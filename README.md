# node server hub  (1.7之后的browser-sync已经支持代理模式，引入本地资源，本项目停止更新)

  - 使用本地web静态资源，调用服务器接口，方便调试
  - 可以解决因为IDE启动的web服务无法立即刷新静态资源，导致browser-sync失效的问题。

## Version
2.0.0

##Release History

1.0.0 版本采用request爬数据

2.0.0 版本采用http-proxy爬数据

## Installation

1. 下载：

```sh
$ git clone https://github.com/m544498510/nodeServerHub.git
```

2. 确保安装有[nodejs](https://nodejs.org) 4.0+

3. 在cmd输入下列命令

```sh
$ cd nodeServerHub
$ npm install
```

## Usage

1. 修改src/config.js里面的配置
2. 使用命令启动服务

```sh
$ npm start
```

3. 使用命令编译es2015代码

```sh
$ npm run build
```


License
-------------
<a href="./LICENSE" target="_blank">MIT</a> license.
