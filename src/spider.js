/**
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

import request from 'request';
import cheerio from 'cheerio';

import {getCookie} from './CookieManager';
import config from './config';


export const spiderResquest = (url,method,params,cb)=>{
  let jar = getCookie();
  let targetUrl = 'http://' + config.targetUrl + url;

  let option = {
    url: targetUrl,
    method: method,
    jar:jar
  };
  if(params){
    option['form'] = params;
  }

  request(option, function (err, response, data){
    respongHandle(err, response, data,option, cb);
  });
};

function respongHandle(err, response, body,info, cb) {
  console.log('----------url:  ' + info.url);
  if (!err && response.statusCode == 200) {
    let contentType = response.headers['content-type'];
    cb(bodyHandle(body),contentType);
  } else if(err){
    console.error(err);
  } else {
    console.log(response.statusCode);
  }
}

function bodyHandle(data){
  if(data && typeof data == 'string'){
    let reg = new RegExp(config.replaceUrl,'g');
    data = data.replace(reg,'http://localhost:'+config.port);
  }
  return data;
}

