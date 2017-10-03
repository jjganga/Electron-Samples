if(window.process && window.process.NativeModule && window.process.NativeModule.require){ //isElectron
	var app = require('electron');
	var remote = app.remote;
	var electronBridge = remote.getGlobal("electronBridge");
}
function upload(){
	if(electronBridge){
		electronBridge();
	}else{
		alert("function not exist");
	}
}