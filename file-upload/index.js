let {app, BrowserWindow} = require('electron');
const url = require('url');
const fs = require('fs');
const path = require('path');
var utils = require("./utils.js");
var log = utils.logToFile || function(){};
let win = null;

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('ready', createWindow);
function fileCallback(args){
	if(args){
		var files = [];
		var fileName = null, fileExt = null, fullPath = null;
		var str = "";
		//log(args);
		for(var i=0;i<args.length;i++){
			fullPath = args[i];
			fileName = fullPath.split("\\").pop();
			fileExt = fileName.split(".").pop();
			str  = str + "File::fullPath::"+fullPath+"\n";
			str = str + "FileName::"+fileName+"\n";
			str = str + "File Extension::"+fileExt+"\n";
			json = {
				fileId : Math.floor((Math.random() * 10000000) + 1),
				fileName : fileName,
				fullPath : fullPath,
				fileExt : fileExt,
				size: getFilesizeInBytes(fullPath),
				sizeInMb: getFilesizeInMb(fullPath)
			};
			files.push(json);
		}
		log(JSON.stringify(files));
	}
}
global.electronBridge = function(json){
	var {dialog} = require('electron');
	var options = {
		title : "Select files",
		filters:[
			{name: 'Attachments', extensions: ['jpg', 'png', 'gif']}
		],
		properties: ['openFile', 'multiSelections']
	};
	dialog.showOpenDialog(win, options, fileCallback);
	//dialog.showMessageBox(win, {type: "info", title:"Hello", detail:"DETAIL JBLKJB  KJ LK", message:"msg jba dfn lkdf  dk skd ks dfajk jksf ", buttons:["OK","CANCEL"]}, fileCallback);
};
function getFilesizeInMb(filename){
	var bytes = getFilesizeInBytes(filename);
	if(bytes){
		return bytes / 1000000.0;
	}
	return 0;
}
function getFilesizeInBytes(filename){
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}