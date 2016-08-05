/**
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

import request from 'request';

import {setCookie} from  './spider/CookieManager';
import * as server from './server';
import config      from './config';

setCookie(request.jar());

let app = server.init(config);
server.start(app, config.port);





