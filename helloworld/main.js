const electron = require('electron');
const app =  electron.app;
const path = require('path');
const url = require('url');
const utils = require('./utils.js');
const BrowserWindow = electron.BrowserWindow;
var log = utils.logToFile || function(){};
var mainWindow;

app.on('ready',function(){
	/*mainWindow = new BrowserWindow({width: 1024, height: 768, backgroundColor: '#2e2c29'});
	let displays = electron.screen.getAllDisplays()
	//mainWindow.loadURL('http://dev.kore.net/Kore');
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}));*/
	var FormData = require('form-data');
    var form = new FormData();
    form.append('appendPartWithFileData', "chunkdata", {Authorization : "bearerToken"});
	log("Hello");
	log(JSON.stringify(form.getHeaders()));
	var x = form.getHeaders();
	x.Authorization = "test";
	log("x"+JSON.stringify(x));
});
