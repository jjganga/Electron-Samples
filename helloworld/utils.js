const fs = require("fs");
var http = require("http");
var logFileName = "log.txt";
function getCurrentTimeStamp(){
    var date = new Date(); 
    var curTimeStamp = date.getDate() + "/"
        + (date.getMonth()+1)  + "/"
        + date.getFullYear() + " @ "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();
    return curTimeStamp;
}
function setLogFileName(){
    var date = new Date(); 
    var curTimeStamp = date.getDate() + "_"
        + (date.getMonth()+1)  + "_"
        + date.getFullYear() + "_"
        + date.getHours() + "_"
        + date.getMinutes() + "_"
        + date.getSeconds();
    logFileName = "./logs/log_"+curTimeStamp+".txt";
}
function logToFile(msg){
    if(getDataType(msg) === "object"){
        msg = JSON.parse(msg);
    }
    try{
        if (!fs.existsSync("./logs")){
            fs.mkdirSync("logs");
        }
        if(fs.existsSync(logFileName)){
            fs.appendFile(logFileName, "\n"+getCurrentTimeStamp()+" :: "+msg, function (err) {
                console.log(err);
            });
        }else{
            fs.writeFile(logFileName, "\n"+getCurrentTimeStamp()+" :: "+msg, function (err) {
                console.log(err);
            });
        }
    }catch(err){
        console.log(err);
    }
}
function getDataType(p) {
    if (p === null) return null;
    else if (p === undefined) return undefined;
    else if (Array.isArray(p)) return 'array';
    else if (typeof p === 'string') return 'string';
    else if (p !== null && typeof p === 'object') return 'object';
    else return undefined;
}
function getFilesizeInMb(filename){
    var bytes = getFilesizeInBytes(filename);
    if(bytes){
        return bytes / 1000000.0;
    }
    return 0;
}
function getFilesizeInBytes(filename){
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}
setLogFileName();
try{
    function download(path, url){
        var file2 =  fs.createWriteStream(app.getAppPath() + path);
        var request = http.get(url, function(response) {
            response.pipe(file2);
        });
    }
}
catch(err){
    console.log("Error while downloading occured");
}
module.exports = {
    getCurrentTimeStamp : getCurrentTimeStamp,
    logToFile : logToFile,
    getDataType : getDataType,
    download : download,
    getFilesizeInMb : getFilesizeInMb,
    getFilesizeInBytes : getFilesizeInBytes
};