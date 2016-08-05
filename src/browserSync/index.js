/**
 * 用于处理browser-sync
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

import browserSync from 'browser-sync';

import config from '../config';

export default ()=>{
   return browserSync.init({
    files: config.syncFiles,
    proxy: {
      target: "http://localhost:"+config.port,
      ws: true
    }
  });
}

