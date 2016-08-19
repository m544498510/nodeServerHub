/**
 *
 * @author :    Mei XinLin
 * @version :   1.0
 */
'use strict';
import url from "url";

import config from '../config';

var host = config.targetUrl;
var string = host;
var port = config.targetPort;

if (host && port) {
    if (parseInt(port, 10) !== 80) {
        string = host + ":" + port;
    }
}
export default {
    match: new RegExp("https?:\\\\/\\\\/" + string + "|https?://" + string + "(\/)?|('|\")(https?://|/|\\.)?" + string + "(\/)?(.*?)(?=[ ,'\"\\s])", "g"),
    //match: new RegExp("https?:\\\\?/\\\\?/" + string + "(\/)?|('|\")(https?://|\\\\?/|\\.)?" + string + "(\/)?(.*?)(?=[ ,'\"\\s])", "g"),
    //match: new RegExp('https?://' + string + '(\/)?|(\'|")(https?://|/|\\.)?' + string + '(\/)?(.*?)(?=[ ,\'"\\s])', 'g'),
    //match: new RegExp("https?:\\\\/\\\\/" + string, "g"),
    fn: function (req, res, match) {

        var proxyUrl = req.headers["host"];

        /**
         * Reject subdomains
         */
        if (match[0] === ".") {
            return match;
        }

        var captured = match[0] === "'" || match[0] === "\"" ? match[0] : "";
        if(match.indexOf('https')> -1){
            captured += 'https:';
        }else{
            captured += 'http:';
        }

        /**
         * allow http https
         * @type {string}
         */
        var pre = "//";

        if (match[0] === "'" || match[0] === "\"") {
            match = match.slice(1);
        }

        /**
         * parse the url
         * @type {number|*}
         */
        var out = url.parse(match);

        /**
         * If host not set, just do a simple replace
         */
        if (!out.host) {
            string = string.replace(/^(\/)/, "");
            return captured + match.replace(string, proxyUrl);
        }

        /**
         * Only add trailing slash if one was
         * present in the original match
         */
        if (out.path === "/") {
            if (match.slice(-1) === "/") {
                out.path = "/";
            } else {
                out.path = "";
            }
        }

        /**
         * Finally append all of parsed url
         */
        return [
            captured,
            pre,
            proxyUrl,
            out.path || "",
            out.hash || ""
        ].join("");
    }
};
