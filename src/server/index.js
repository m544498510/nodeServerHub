/**
 * 用于处理express服务
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

import express    from 'express';
import multer     from 'multer';
import bodyParser from 'body-parser';

import {spiderRequest} from '../spider';
import initBrowserSync  from '../browserSync';

/***
 * 初始化express
 * @param config {object} - 配置对象
 */
export const init = (config) => {
  const app = express();
  const port = config.port;

  // 用于解析 application/json
  app.use(bodyParser.json());
  // 用于解析 application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // 设置静态资源url 和 路径
  app.use(config.staticRes.sign, express.static(config.staticRes.path));

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
  const upload = multer();

  app.get("/*", (req, res) => {
    let url = req.originalUrl;
    spiderRequest(url,'GET',req,function(body, headers){
      sendBody(res,body,headers);
    });

  });

  app.post('/*', upload.array(), (req,res)=>{
    let url = req.originalUrl;
    spiderRequest(url,'POST',req, function(body, headers){
      sendBody(res,body,headers);
    });
  });
}

/***
 * 请求返回处理
 * @param res {object} - response 对象
 * @param body {string} - 返回内容
 * @param headers {Object} - 返回值类型
 */
function sendBody(res,body,headers){
  res.set('Content-Type', headers['content-type']);
  res.send(body);
}
