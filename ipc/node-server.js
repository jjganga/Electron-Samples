try{
	var net = require('net');
	var server = net.createServer(function(connection){
	   console.log('Client Connected');
	   
	   connection.on('end', function() {
		  console.log('client disconnected');
	   });
		connection.on("error", function(err){
			console.log("Caught error 111111111111111111: ")
			console.log(err.stack)
		})
	   connection.write('Hello World!\r\n');
	   connection.pipe(connection);
	});
}catch(e){
	console.log(e);
}

server.listen(8181, function() {
   console.log('Server running on http://localhost:8787');
});