// In the main process.
const {BrowserView, BrowserWindow, contentTracing} = require('electron')
const electron = require('electron');
const app =  electron.app;

app.on('ready',function(){
	let win = new BrowserWindow({width: 800, height: 600})
	let view = new BrowserView({
	  webPreferences: {
		nodeIntegration: false
	  }
	})
	win.setBrowserView(view)
	view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
	view.webContents.loadURL('https://electron.atom.io')
	
	
	win.on('closed', () => {
	  win = null
	})
	
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Tracing started')

    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Tracing data recorded to ' + path)
      })
    }, 5000)
});
	
});