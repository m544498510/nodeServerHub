/**
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

const staticPath = 'F:/javaData/work/workCopy/javaFront/src/main/webapp/static';

export default {
  port: 9090,
  //目标web服务，如www.baidu.com，localhost:8080等。
  targetUrl: 'test.urelitetech.com.cn:80',
  replaceUrl: 'http://test.urelitetech.com.cn:80',
  staticRes: {
    sign: ['/static','//static'],
    path: staticPath
  },

  syncFiles:[
    staticPath + '/**/*.js',
    staticPath + '/**/*.css'
  ]
}
