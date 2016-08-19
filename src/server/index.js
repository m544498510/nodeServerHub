/**
 * 用于处理express服务
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

import express from 'express';

import initBrowserSync  from '../browserSync';
import proxy            from './proxy';
import config           from '../config';
import respModifier      from '../respModifier';


/***
 * 初始化express
 * @param config {object} - 配置对象
 */
export const init = (config) => {
  const app = express();
  const port = config.port;

  // 设置静态资源url 和 路径
  app.use(config.staticRes.sign, express.static(config.staticRes.path));

  app.use(respModifier);

  initRoute(app);

  return app;
};

/***
 * 启动express
 * @param app {object} - express实例
 * @param port {int}   - 端口
 */
export const start = (app,port) => {
  app.listen(port, function(error) {
    if (!error) {
      if(!(process.argv.join().indexOf('--noBS')>-1)){
        initBrowserSync();
      }
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    } else {
      console.error(error);
    }
  });
};

/***
 * 路由
 * @param app {object} - express实例
 */
function initRoute(app){
  app.all("/*", (req, res) => {

    proxy.web(req, res, {
      target: 'http://'+config.targetUrl + ':' + config.targetPort
    },function(e){
      console.log(e);
    });
  });
}
