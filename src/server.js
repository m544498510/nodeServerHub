/**
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import request from 'request';

import {spiderResquest} from './Spider';
import {setCookie} from  './CookieManager';

import config from './config';

setCookie(request.jar());

const app = express();
const upload = multer();
const port = config.port;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(['/static','//static'],express.static(config.staticPath));

app.get("/*", (req, res) => {
  let url = req.originalUrl;
  spiderResquest(url,'GET',null,function(body,contentType){
    sendBody(res,body,contentType);
  });

});

app.post('/*',upload.array(), (req,res)=>{
  let url = req.originalUrl;
  spiderResquest(url,'POST',req.body,function(body,contentType){
    sendBody(res,body,contentType);

  });
});

function sendBody(res,body,contentType){
  res.set('Content-Type', contentType);
  res.send(body);

}


app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});


