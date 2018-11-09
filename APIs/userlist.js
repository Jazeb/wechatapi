const express = require('express');
const request = require('request');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res)=> {

    getUserist = new Promise(function(resolve, reject){

    if(!fs.readFileSync('./responses/access-token.json')) reject("Access token does not exists");
    else {
        request('https://api.weixin.qq.com/cgi-bin/user/get?access_token='+ getAccessToken() +'&next_openid=oU7C01IHxsk74jjlLey-y0O9-ieE', function(err, response, body){
            console.log(body);
            resolve(res.render('userlist', {tite:'Users List'}));
        }).pipe(fs.createWriteStream('./responses/userlist.json'));
    }
});

getUserist.then(function(fromResolve){
    fromResolve;
}).catch(function(fromReject) {res.send(fromReject)});
    
    function getAccessToken(accesstoken) {
        
        let rdata = fs.readFileSync('./responses/access-token.json');
        let data = JSON.parse(rdata);
        console.log(data);
        return data.access_token;}
});

module.exports = router;