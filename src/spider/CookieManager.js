/**
 * request模块cookie管理
 * @author :    may_firefly
 * @version :   1.0
 */
'use strict';

let cookieJar = null;

export const getCookie = ()=>{
  return cookieJar;
};

export const setCookie = (cookie)=>{
  cookieJar = cookie;
};
