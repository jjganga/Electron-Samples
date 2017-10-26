'use strict';
var {app} = require('electron');
var path = require('path');
global.appRoot = path.resolve(__dirname);
var log = require('./logger.js');
/*log.transports.file.appName = 'electron-log-test';
log.transports.file.file = setLogFileName();

function setLogFileName(){
    var date = new Date();
    var curTimeStamp = date.getDate() + "_"
        + (date.getMonth()+1)  + "_"
        + date.getFullYear() + "_"
        + date.getHours() + "_"
        + date.getMinutes() + "_"
        + date.getSeconds();
		if (!fs.existsSync(__dirname + "/logs")){
            fs.mkdirSync(__dirname + "/logs");
        }
    return __dirname + "/logs/log_"+curTimeStamp+".txt";
}*/

app.on('ready', function() {
	log.info('Hello, info');
	log.warn('Hello, warn');
	log.debug('Hello, debug');
	log.error('Hello, error');
});