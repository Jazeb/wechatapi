const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended:true}));

router.get('/', (req, res)=> {res.render('userinfo')})
router.post('/', (req, res)=> { 
    console.log('user info request received');
var openid = req.body.openid;
    getUserInfo = new Promise((resolve, reject)=>{

    if(!fs.existsSync('./responses/access-token.json')) reject('Access token does not exist');
    else {
        request('https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + getAccessToken() + '&openid='+openid+'&lang=zh_CN', function(error, response, body){
            console.log('status code: '+response.statusCode);
             resolve(res.render('uinfo', {title:'Users Information'}));
        }).pipe(fs.createWriteStream('./responses/userinfo.json'));


        
    }        
});//promise ends

getUserInfo.then(function(fromResolve){
    fromResolve;
    
}).catch(function(fromReject) {console.log(fromReject)});
    

    

});
    function getAccessToken(accesstoken) {
        let rdata = fs.readFileSync('./responses/access-token.json');
        let data = JSON.parse(rdata);
        //console.log(data);
        return data.access_token;}
module.exports = router;