/**
 *
 * @author :    Mei XinLin
 * @version :   1.0
 */
'use strict';

import httpProxy from 'http-proxy';

import config from '../config';
const proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

export default proxy;

