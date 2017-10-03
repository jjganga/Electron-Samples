'use strict';
const electron	= require('electron');
const app		= electron.app;

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});
	//win.loadURL('http://dev.kore.net/Kore');
	win.loadURL('file://'+__dirname+'/app/index.html');
	win.on('closed', onClosed);
	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	console.log();
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	const myEmitter = new MyEmitter();
	// Only do this once so we don't loop forever
	myEmitter.once('newListener', (event, listener) => {
	  if (event === 'event') {
		// Insert a new listener in front
		myEmitter.on('event', () => {
		  console.log('B');
		});
	  }
	});
	myEmitter.on('event', () => {
	  console.log('A');
	});
	myEmitter.emit('event');	
});