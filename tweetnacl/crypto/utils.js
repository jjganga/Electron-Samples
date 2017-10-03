var nacl_factory = require("js-nacl");
var nacl =null;
 nacl_factory.instantiate(function(naclarg){
 	nacl = naclarg;
	console.log("arg",nacl.to_hex(nacl.random_bytes(16)));
});

function cryptoBox(content, pub, priv) {

	var message = new Buffer(content, 'base64');
	var nonce = nacl.crypto_box_random_nonce();
	var pubKeyBuff = new Buffer(pub, 'base64');
	var privKeyBuff = new Buffer(priv, 'base64');
	var packet = nacl.crypto_box(message, nonce, pubKeyBuff, privKeyBuff);
	var encryptedContent = new Buffer(packet).toString('base64');
	var nonceBase64 = new Buffer(nonce).toString('base64');
	return {encryptedContent:encryptedContent, nonce:nonceBase64};
}

function cryptoBoxOpen(content, nonce, pub, priv){
	var message = new Buffer(content, 'base64');
	var nonceBuff = new Buffer(nonce, 'base64');
	var pubKeyBuff = new Buffer(pub, 'base64');
	var privKeyBuff = new Buffer(priv, 'base64');
	var packet = nacl.crypto_box_open(message, nonceBuff, pubKeyBuff, privKeyBuff);
	var decryptedContent = new Buffer(packet).toString('base64');
	return decryptedContent;
}

function cryptoBoxKeyPair(){
	var keyPairBuff = nacl.crypto_box_keypair();
	var pk = new Buffer(keyPairBuff.boxPk).toString('base64');
	var sk = new Buffer(keyPairBuff.boxSk).toString('base64');
	return {pk:pk, sk:sk};
}

function generatekey(length){
         try {
                //NOTE: This will block if there is insufficient entropy,
                //      although it should normally never take longer than a few milliseconds.
                //      The only time when this may conceivably block is right after boot, when the whole system is still low on entropy.
                return require('crypto').randomBytes(length).toString("base64");

            } catch (err) {
                // handle error
                // most likely, entropy sources are drained
                console.error("FATAL : Unable to generate randomBytes ,entropy sources are likely drained" , err && err.stack);
                throw err;
            }
    }

module.exports = {
	cryptoBoxOpen:cryptoBoxOpen,
	cryptoBox:cryptoBox,
	cryptoBoxKeyPair:cryptoBoxKeyPair,
	generatekey : generatekey
};
