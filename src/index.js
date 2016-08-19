/**
 * @author may_firefly
 * @version 1.0.0
 */
'use strict';

import * as server from './server';
import config      from './config';

let app = server.init(config);
server.start(app, config.port);





