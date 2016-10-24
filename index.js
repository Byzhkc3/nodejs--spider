var db = require("./db");
var tools = require("./tools");
var config = require('./config');
    console.log(config['username']);
var superagent = require("superagent");
var cheerio = require('cheerio');
var request = require("request");

var usercookie = null;


function getloginCookie() {
    var auth = {
        'username' : config.username,
        'password' : config.password,
        'csrfmiddlewaretoken' : getCsrf
    };
    console.log(auth);
    request.post('https://www.shanbay.com/accounts/login/', null, auth, function (err, data) {
        if (err) {
            console.log('Post error');
            return;
        }
        var $ = cheerio.load(data, { decodeEntities: false });
    })
}