var logger = require('electron-log');
var fs = require("fs");
logger.transports.file.appName = "electron-log-test";
logger.transports.file.file = getLogFileName();
function getLogFileName(){
	logger.info("appRoot::",appRoot);
    var logFolder = appRoot + "/logs";
    var date = new Date(); 
    var curTimeStamp = date.getDate() + "_"
        + (date.getMonth()+1)  + "_"
        + date.getFullYear() + "_"
        + date.getHours() + "_"
        + date.getMinutes() + "_"
        + date.getSeconds();
        if (!fs.existsSync(logFolder)){
            fs.mkdirSync(logFolder);
        }
		var logFilepath = logFolder + "/log_"+curTimeStamp+".txt"
		logger.info("logFilepath::",logFilepath);
    return logFilepath;
}
module.exports = {
    info : logger.info,
    debug : logger.debug,
    error : logger.error,
    warn : logger.warn,
	verbose : logger.verbose,
	silly : logger.silly,
	logger : logger
};