var db = require("./db");
var tools = require("./tools");
var config = require("./config");
var cheerio = require("cheerio");
var request = require("request");

var usercookie = null;
var postUrl = config.postUrl;

function getloginCookie() {
    tools.get(postUrl, null, function (err, data) {
        if (err) {
            console.log('err');
            return;
        }
        var $ = cheerio.load(data);
        var csrf = $('#login-form-tmpl').html().match(/value='\w{32}'/)[0].slice(7, -1);
        var auth = {
            'username': config.username,
            'password': config.password,
            'csrfmiddlewaretoken': csrf
        };
        console.log(auth);
        tools.postFrom(postUrl, auth, function (err, response, data) {
            if (err) {
                console.log(err);
                return;
            }
            var $ = cheerio.load(data);
            console.log(auth);
        })
    });

}
getloginCookie();