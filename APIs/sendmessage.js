const express = require('express');
const request = require('request');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

const flash = require('connect-flash');
const session = require('express-session');


router.use(bodyParser.urlencoded({ extended:true}));

// Express session middleware
router.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  
  // Express Messages Middleware
  router.use(require('connect-flash')());
  router.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

router.get('/', (req, res)=>{res.render('sendmessage', {title:'Send Message'})});

router.post('/', (req, res) => {

    var openid = req.body.openid;
    var message = req.body.message;

    var options = {
        url: 'https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token='+getAccessToken(),
        method: 'POST', 
        headers: {
            'connection': 'keep-alive',
            'content-type': 'application/json'},
        json: true,
        body: {
            "touser":openid,  
            "msgtype":"text",
            "text":{ 
                "content": message
            }
        }
    };

    console.log(options);
    sendMessage = new Promise(function(resolve, reject){

        if(!fs.existsSync('./responses/access-token.json')) reject("Access token not found or expired");
        else {
            request(options, function(error, response, body){
            if(error) console.log(error);
            else {
                console.log('\nOptions: '+options);
                console.log('\nBody: '+body);
                console.log('\nSend message status: '+response.statusCode);
                console.log(body);
                console.log(body.errcode);
                if (body.errcode == 0 && body.errmsg=='preview success') 
                 {
                    req.flash('success', 'message sent');
                    resolve(res.redirect('/sendmessage'));   
                }

                else if(body.errcode == 40037) {res.send('Invalid Template ID')}
                else if(body.errcode == 40003) {res.send('Invalid open id')}

                else reject(req.flash('danger', 'message not sent'));
        }
            });//.pipe(fs.createWriteStream('./responses/sendmessage.json'));
            
    }
    }); //end of promise

    sendMessage.then(function(fromResolve) {
        fromResolve;
    }).catch(function(fromReject){
        fromReject;
    });    

});


function getAccessToken(accesstoken) {
    
    let rdata = fs.readFileSync('./responses/access-token.json');
    let data = JSON.parse(rdata);
    
    return data.access_token;}

module.exports = router;