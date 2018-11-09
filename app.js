const express = require('express')
const app = express();
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');



const appID = ''; 
const secretKey = '';

const openID = require('./APIs/openid');
const userList = require('./APIs/userlist');
const userInfo = require('./APIs/userinfo');
const sendMessage = require('./APIs/sendmessage');

//List of APIs
app.use('/openid', openID);
app.use('/userlist', userList);
app.use('/userinfo', userInfo);
app.use('/sendmessage', sendMessage);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended:true}));



app.use(express.static(path.join(__dirname, 'responses')));

app.get('/', (req, res)=>{

  let getAccessToken = new Promise(function (resolve, reject){

    request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appID + '&secret=' + secretKey)
         .on('response', (response) => {
          }).pipe(fs.createWriteStream('./responses/access-token.json'));
  
          if(fs.existsSync('./responses/access-token.json')) resolve(res.render('index'));
          else reject(res.render('tokenexpire'));
  
  });

  getAccessToken.then(function(fromResolve){
    fromResolve;
  }).catch(function(fromReject){ fromReject });
  

});

module.exports = app;