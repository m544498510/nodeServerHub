/**
 * 爬虫
 * @author may_firefly
 * @version 1.0
 */
'use strict';

import request from 'request';

import {getCookie} from './CookieManager';
import config from '../config';

/***
 * 爬虫请求
 * @param url {string} - 请求路径
 * @param method {string} - 请求类型（GET,POST,PUT...）
 * @param params {object} - 请求参数（只有POST才有）
 * @param cb {function} - 回调函数
 */
export const spiderRequest = (url, method, params, cb)=>{
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
    responseHandle(err, response, data,option, cb);
  });
};

/***
 * response处理
 * @param err {object} - 错误
 * @param response {object} - 请求回应对象
 * @param body {string} - 请求回应内容
 * @param info {object} - 请求信息
 * @param cb {function} - 回调函数
 */
function responseHandle(err, response, body,info, cb) {
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

/***
 * 对请求内容进行处理
 * @param data {string|*} - 请求答应内容
 * @returns {string|*}
 */
function bodyHandle(data){
  if(data && typeof data == 'string'){
    let reg = new RegExp(config.replaceUrl,'g');
    data = data.replace(reg,'http://localhost:'+config.port);
  }
  return data;
}

