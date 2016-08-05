/**
 * @author May
 * @version 1.0.0
 */
'use strict';

import express    from 'express';
import multer     from 'multer';
import bodyParser from 'body-parser';

import {spiderResquest} from '../spider';
import initBrowserSync  from '../browserSync';

export const init = (config) => {
  const app = express();
  const port = config.port;

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(config.staticRes.sign, express.static(config.staticRes.path));

  initRoute(app);

  return app;
};

export const start = (app,port) => {
  app.listen(port, function(error) {
    if (!error) {
      initBrowserSync();
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    } else {
      console.error(error);
    }
  });
};

function initRoute(app){
  const upload = multer();

  app.get("/*", (req, res) => {
    let url = req.originalUrl;
    spiderResquest(url,'GET',null,function(body,contentType){
      sendBody(res,body,contentType);
    });

  });

  app.post('/*', upload.array(), (req,res)=>{
    let url = req.originalUrl;
    spiderResquest(url,'POST',req.body,function(body,contentType){
      sendBody(res,body,contentType);
    });
  });
}

function sendBody(res,body,contentType){
  res.set('Content-Type', contentType);
  res.send(body);
}
