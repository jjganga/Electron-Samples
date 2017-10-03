var _ = require('lodash');
var Promise = require('bluebird');
var utils = require('./utils');


function getKeyById(Keys, kId) {
	return new Promise(function(resolve, reject) {
		var docs =  [ 
			    {
					"_id" : "5603b5c961a527a14dbb9c5e",
					"namespaceId" : "server",
					"kty" : "EC",
					"pub" :  "hPidmBtL3yDuVD4f+0Smh9Moa02n75TXvhZkAHACJ0w=",
					"priv" : "YVX0EjgPdUxynqLTTrzwJVLiBgznOPapfnMC7/plzI0=",
					"kid" : "k-e6678920-fb95-5b51-8529-3cf11fef4d02",
					"__v" : 0
				},{
					"_id" : "5639dc532c06449712e5095f",
					"kid" : "k-f76871e2-5e53-5407-91ac-7e4317ea0252",
					"namespaceId" : "user",
					"pub" : "5wje+Aiz+hSWRUo3ZI4g4DctGzrd0GoaNziXDGllKxE=",
					"priv" : "Pxkt39gX2bFPpuL1fXvCtHRiGyjJ8lfpoqlu8f0swxI=",
					"kty" : "EC",
					"__v" : 0
				}
			];
		return resolve(docs);
	});
}

module.exports = {
	encrypt: function encrypt(body) {
		console.log('encrypt input', body);

			return getKeyById()
			.then(function(docs) {
				var serverDoc = _.find(docs, function(doc){
					return doc.namespaceId === "server";
				});
				console.log("--------serverDoc.priv",serverDoc.priv);
				var resp = {};
				resp.content = _.map(_.without(docs,serverDoc), function(doc){
					// Encrypt the content with server private key and namespace's public key
					var encrypted = utils.cryptoBox(body.content, doc.pub, serverDoc.priv);
					encrypted.namespaceId = doc.namespaceId;
					encrypted.keyId = doc.kid;
					return encrypted;
				});
				resp.serverKeyId = serverDoc.kid;
				console.log("Encrypt resp -----------",resp);
				return resp;
			})
			.catch(function(err){
				console.error(err);
				return Promise.reject(err);
			});
	},


	decrypt:  function decrypt(body) {
		console.log('decrypt input', body);

		return getKeyById()
		.then(function(docs) {
			var serverDoc = _.find(docs, function(doc){
				return doc.namespaceId === "server";
			});
			var recipientDoc = _.find(docs, function(doc){
				return doc.namespaceId === "user";
			});

console.log("--------serverDoc.priv--2",serverDoc.priv);
			console.log('------------decrypt', body.cipher, body.nonce, serverDoc.pub,recipientDoc.priv);
			var decryptedContent = utils.cryptoBoxOpen(body.cipher, body.nonce, recipientDoc.pub, serverDoc.priv);
			var resp = {decipher:decryptedContent};

			return resp;
		})
		.catch(function(err){
			console.error(err);
			return Promise.reject(err);
		});
	}
}