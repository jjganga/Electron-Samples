var _ = require('lodash');
var Promise = require('bluebird');
//var utils = require('./utils');
var crypto = require('./crypt');


var message = "raga";
	crypto.encrypt({content:message})
	.then(function (encrypteddata) {
		console.log("encrypted data ----",encrypteddata.content[0]);
		var encryptedbody = {
				cipher:encrypteddata.content[0].encryptedContent,
				nonce: encrypteddata.content[0].nonce
		};
		return crypto.decrypt(encryptedbody)
		.then(function(contents){
			console.log("Contensts after decryption---",contents);
		});
	})
	.catch(function(err){
		console.trace("Errr in encryption and decryption process",err);
	})


