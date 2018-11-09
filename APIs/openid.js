const express = require('express');
const request = require('request');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {

    getOpenIDPromise = new Promise(function(resolve, reject){

        if(!fs.existsSync('./responses/access-token.json')) reject("Access token not found or expired");
        else {
            request('https://api.weixin.qq.com/cgi-bin/user/get?access_token=' + getAccessToken() + '&next_openid=', function(error, response, body){
                //console.log('\n\n'+body);
                resolve(res.render('openid', {title:'Open ID'}));
            }).pipe(fs.createWriteStream('./responses/openid.json'));

    }
    }); //end of promise

    getOpenIDPromise.then(function(fromResolve) {
        fromResolve;
    }).catch(function(fromReject){
        res.send(fromReject);
    });    

});


function getAccessToken(accesstoken) {
    console.log("inside of get access tokn function");
    let rdata = fs.readFileSync('./responses/access-token.json');
    let data = JSON.parse(rdata);
    
    return data.access_token;}

module.exports = router;