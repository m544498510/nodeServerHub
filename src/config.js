/**
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

const staticPath = 'F:/javaData/work/workCopy/javaFront/src/main/webapp/static';

export default {
  port: 9090,

  //目标web服务，如www.baidu.com，localhost:8080等。
  targetUrl: '',
  //用于替换页面内写死的绝对路径，如http://www.xxxxxx.com:80。
  replaceUrl: '',
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
