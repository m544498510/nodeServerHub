/**
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

const staticPath = '';

export default {
  //中转服务端口
  port: 9090,

  //目标web服务，如www.baidu.com，localhost等。
  targetUrl: '',
  //目标服务的端口号，用于替换页面内的链接。
  targetPort: '',

  //本地静态资源
  staticRes: {
    sign: ['/static','//static'], //请求标志
    path: staticPath              //资源路径
  },
  //需要监听的文件
  syncFiles:[
    staticPath + '/**/*.js',
    staticPath + '/**/*.css'
  ]
}
