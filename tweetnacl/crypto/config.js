var authToken = null, userId = null, userObj = null, authObj=null, userKeys=null;
function getAuthToken(){
    if(authObj){
        return authObj.accessToken;
    }
    return null;
}
function setAuthToken(token){
    authToken = token;
}
function getUserId(){
    if(userObj){
        return userObj.id;
    }
}
function setUserId(id){
    userId = id;
}
function getUserInfo(){
    if(userObj){
        return userObj;
    }
}
function setUserInfo(obj){
    userObj = obj;
}
function getUserAuthInfo(){
    if(authObj){
        return authObj;
    }
}
function setUserAuthInfo(obj){
    authObj = obj;
}
function setUserKeys(keys){
    /*Format
    {
        "kty" : "ec",
        "kid" : "k-9572a67f-d919-5dc0-8db4-02ea48669d63",
        "pub" : "GKWMkteYvhLN39X7p6gYMUFE0y0VzlPA1JyEKy155jo=",
        "priv": "9MPZX9Aj32w0LUTKnduAs7xn0OsGVa8vGKpCKkvzWNU=",
        "namespaceId":"u-f9d341ac-f635-59c0-8931-7f66b0c2552f"
    }
    */
    userKeys = keys;
}
function getUserKeys(){
    return userKeys;
}
module.exports = {
    appUrl : "https://dev.kore.com/Kore",
    crypto : {
        "ALGORITHM": "aes-256-cbc",
        "CEK_LENGTH": 32,
        "IV_LENGTH": 16,
        "ALG":"ECDH-ES+A256KW",
        "enable":false,
        "encryption_at_rest":{
            "enable"    : true,
            "encryption_algorithm" : "aes-256-cbc",
            "key_management_mode" :"dir",
            "nsid" : "K0R3NAM3SPAC31D0",
            "ivlength" : 16
        }
    },
    setAuthToken : setAuthToken,
    getAuthToken : getAuthToken,
    setUserInfo : setUserInfo,
    getUserInfo : getUserInfo,
    setUserAuthInfo : setUserAuthInfo,
    getUserAuthInfo : getUserAuthInfo,
    getUserId : getUserId,
    setUserKeys : setUserKeys,
    getUserKeys : getUserKeys
};