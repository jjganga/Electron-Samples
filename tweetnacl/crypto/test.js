var _ = require('lodash');
var Promise = require('bluebird');
//var utils = require('./utils');
var crypto = require('crypto');
var cryptoUtils = require('./CryptoUtils.js');
console.log("Started logging..");

function encryptOrDecrypt(text, cek, iv, decrypt) {
	var ALG = "aes-256-cbc";
    if (!text) return;
    var cipher = !!decrypt ? crypto.createDecipheriv(ALG, cek, iv) : crypto.createCipheriv(ALG, cek, iv);
    var crypted = !!decrypt ? cipher.update(text, 'base64', 'utf8') : cipher.update(text, 'utf8', 'base64');
    crypted += !!decrypt ? cipher.final('utf8') : cipher.final('base64');
    return crypted;
}

var encryptedMsg = "rBlRjdRwPARFEJjuZx/Ghg==";
var encryptedKey = "5HkfkDLRGOJphGsgmv7iwfjR7FNTdzDkhqAsbtdEu2B9K7Mmyvf9K2IGVwohqS5h";
var serverPubKey = "ZBrCzo1i6HdIcNVJKC7drR/89PVvr7ea7E33S9qHXhI=";
var secretKey = "9MPZX9Aj32w0LUTKnduAs7xn0OsGVa8vGKpCKkvzWNU=";
var nonce = "31/y3Znyfz6TBgs1v14+8JAI/f5CUHIp";
var symmetricIV = "FlapWLJDVTTWEvUS0FCeQw==";

//log(encryptedKey, serverPubKey, secretKey, nonce);
var symmetricKey    = cryptoUtils.cryptoBoxOpen(encryptedKey, nonce, serverPubKey, secretKey);
console.log("######################### symmetricKey::"+symmetricKey);
//var symmetricKey    = "EOgZe9GfMxkzoJ9R/LCw9gSboA21EBkfCiEEg0T5uqE=";
    var cekBuff = new Buffer(symmetricKey, 'base64');
    var ivBuff = new Buffer(symmetricIV, 'base64');
	
var decryptedMsg    = encryptOrDecrypt(encryptedMsg, cekBuff, ivBuff, true);
console.log("######################### decryptedMsg::"+decryptedMsg);
/*DQGeIKPjgBB/wh4/xWWpbJcKfppP+n/sB1VL2iwtNQLMU/iiA4CHYDbm2Wqk1m+99mci7/uHPUndIBQug8qQFjh0Xran+eJodpp9b6IhBSg=
llrmzKtvwgT//ptIEY4mg9iMQX0SCRS0D4EQEgwtKBw=
0XFEdHROMsxmSO5q1VNxkw==
true*/
//var decryptedMsg1    = encryptOrDecrypt(encryptedMsg, symmetricKey, symmetricIV, true);
//console.log("######################### decryptedMsg::"+decryptedMsg1);
//console.log(decryptedMsg);

/*
19/7/2017 @ 19:37:22 :: encrypted_key::5HkfkDLRGOJphGsgmv7iwfjR7FNTdzDkhqAsbtdEu2B9K7Mmyvf9K2IGVwohqS5h
19/7/2017 @ 19:37:22 :: serverPubKey::ZBrCzo1i6HdIcNVJKC7drR/89PVvr7ea7E33S9qHXhI=
19/7/2017 @ 19:37:22 :: secretKey::17HMPD4BI9l00mbqqyptP3yPglCrcbbCQqFO+EV5quk=
19/7/2017 @ 19:37:22 :: nonce::31/y3Znyfz6TBgs1v14+8JAI/f5CUHIp


25/7/2017 @ 15:3:34 :: encrypted_key::5HkfkDLRGOJphGsgmv7iwfjR7FNTdzDkhqAsbtdEu2B9K7Mmyvf9K2IGVwohqS5h
25/7/2017 @ 15:3:34 :: serverPubKey::ZBrCzo1i6HdIcNVJKC7drR/89PVvr7ea7E33S9qHXhI=
25/7/2017 @ 15:3:34 :: secretKey::9MPZX9Aj32w0LUTKnduAs7xn0OsGVa8vGKpCKkvzWNU=
25/7/2017 @ 15:3:34 :: nonce::31/y3Znyfz6TBgs1v14+8JAI/f5CUHIp
25/7/2017 @ 15:3:34 :: ######################### symmetricKey::
25/7/2017 @ 15:3:34 :: encryptedData::rBlRjdRwPARFEJjuZx/Ghg==
25/7/2017 @ 15:3:34 :: 
*/