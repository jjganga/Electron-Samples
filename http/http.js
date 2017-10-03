var request = require('request');
var fs = require("fs");
var url ='http://www.mocky.io/v2/595e114f10000075017c18a4';
var getCurrentTimeStamp = function(){
	var currentdate = new Date(); 
	var curTimeStamp = currentdate.getDate() + "/"
		+ (currentdate.getMonth()+1)  + "/" 
		+ currentdate.getFullYear() + " @ "  
		+ currentdate.getHours() + ":"  
		+ currentdate.getMinutes() + ":" 
		+ currentdate.getSeconds();
	return curTimeStamp;
}
request(url, function (error, response, body) {
  if (!error) {
    console.log(body);
	fs.appendFile('ganga.txt', "\n"+getCurrentTimeStamp()+" ::"+body, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});	
  }
});

/*request
  .get('http://www.mocky.io/v2/595e114f10000075017c18a4')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('ganga.txt'))*/