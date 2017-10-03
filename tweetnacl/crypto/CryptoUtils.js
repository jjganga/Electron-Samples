var config = require('./config.js');
var crypto = require('crypto');
var debug = require('debug')('crypto utils:');
var fs = require('fs');
var utils = require("./main/utils.js");
var log = utils.logToFile || function(){};
var nacl_factory = require("js-nacl");
var nacl =null;
 nacl_factory.instantiate(function(naclarg){
 	nacl = naclarg;
	console.log("arg",nacl.to_hex(nacl.random_bytes(16)));
});
var ALG = config.crypto.ALGORITHM;
/*var icek = generateCEK();
var iiv = generateIV();
var encrypted = encryptOrDecrypt("Some message to encrypt",icek,iiv, false);
log("Encrypted RESULT::"+encrypted);
log("Decrypted RESULT::"+encryptOrDecrypt(encrypted,icek,iiv, true));*/

function cryptoBox(content, pub, priv, encoding) {
    var message = new Buffer(content, encoding);
    var nonce = nacl.crypto_box_random_nonce();
    var pubKeyBuff = new Buffer(pub, 'base64');
    var privKeyBuff = new Buffer(priv, 'base64');
    var packet = nacl.crypto_box(message, nonce, pubKeyBuff, privKeyBuff);
    var encryptedContent = new Buffer(packet).toString('base64');
    var nonceBase64 = new Buffer(nonce).toString('base64');
    return {
        encryptContent: encryptedContent,
        nonce: nonceBase64
    };
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
function generateRandomBytes(length) {
    // body...
    var buf;
    try {
        buf = crypto.randomBytes(length);
    } catch (ex) {
        // handle error most likely, entropy sources are drained
        debug('error while generating randomBytes', ex);
    }
    return buf;
}

function generateCEK() {
    return generateRandomBytes(config.crypto.CEK_LENGTH);
}

function generateIV() {
    return generateRandomBytes(config.crypto.IV_LENGTH);
}

function encryptOrDecrypt(text, cek, iv, decrypt) {
    if (!text) return;
    var cipher = !!decrypt ? crypto.createDecipheriv(ALG, cek, iv) : crypto.createCipheriv(ALG, cek, iv);
    var crypted = !!decrypt ? cipher.update(text, 'base64', 'utf8') : cipher.update(text, 'utf8', 'base64');
    crypted += !!decrypt ? cipher.final('utf8') : cipher.final('base64');
    return crypted;
}

function encryprOrDecryptComponent(cmp, cek, iv, decrypt) {
    cmp.body = encryptOrDecrypt(cmp.body, cek, iv, decrypt);
    cmp.componentBody = encryptOrDecrypt(cmp.componentBody, cek, iv, decrypt);

    var data = cmp.data || cmp.componentData;

    if (data) {
        data.address = encryptOrDecrypt(data.address, cek, iv, decrypt);
        data.name = encryptOrDecrypt(data.name, cek, iv, decrypt);
        data.lastName = encryptOrDecrypt(data.lastName, cek, iv, decrypt);
        data.firstName = encryptOrDecrypt(data.firstName, cek, iv, decrypt);
        if (data.emails) {
            data.emails.forEach(function(email) {
                email.id =  encryptOrDecrypt(email.id, cek, iv, decrypt);
            });
        }
        if (data.phones) {
            data.phones.forEach(function(phone) {
                phone.number = encryptOrDecrypt(phone.number, cek, iv, decrypt);
            });
        }
    }
}

function encryptContent(components, cek, iv) {
    components.forEach(function(cmp) {
        encryprOrDecryptComponent(cmp, cek, iv);
    });
}

// TODO should pass decipher bool
function decryptContent(components, cek, iv) {
    var cekBuff = new Buffer(cek, 'base64');
    var ivBuff = new Buffer(iv, 'base64');
    components.forEach(function(cmp) {
        encryprOrDecryptComponent(cmp, cekBuff, ivBuff, true);
    });
}

function encryptFile(originalFilePath, cek, iv) {
    debug('encrypting file :' + originalFilePath);
    var fileBuff = fs.readFileSync(originalFilePath);
    var cekBuff = new Buffer(cek, 'base64');
    var ivBuff = new Buffer(iv, 'base64');
    var cipher = crypto.createCipheriv(ALG, cekBuff, ivBuff);
    var encryptedFileBuff = new Buffer.concat([cipher.update(fileBuff), cipher.final()]);
    var encryptFilePath = originalFilePath + '_encrypted';
    fs.writeFileSync(encryptFilePath, encryptedFileBuff);
    debug('successfully encrypted file :' + encryptFilePath);
    return encryptFilePath;
}

function decryptFile(originalFilePath, cek, iv) {
    debug('decrypting file :' + originalFilePath);
    var fileBuff = fs.readFileSync(originalFilePath);
    var cekBuff = new Buffer(cek, 'base64');
    var ivBuff = new Buffer(iv, 'base64');
    var decipher = crypto.createDecipheriv(ALG, cekBuff, ivBuff);
    var decryptedFileBuff = new Buffer.concat([decipher.update(fileBuff), decipher.final()]);
    var decryptFilePath = originalFilePath + '_decrypted';
    fs.writeFileSync(decryptFilePath, decryptedFileBuff);
    debug('successfully decrypted file :' + decryptFilePath);
    return decryptFilePath;
}

module.exports = {
    generateCEK: generateCEK,
    generateIV: generateIV,
    encryptContent: encryptContent,
    decryptContent: decryptContent,
    cryptoBox: cryptoBox,
    cryptoBoxOpen: cryptoBoxOpen,
    encryptFile: encryptFile,
    decryptFile: decryptFile
};