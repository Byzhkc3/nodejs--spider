var db = require("./db");
var tools = require("./tools");
var config = require("./config");
var cheerio = require("cheerio");
var request = require("request");

var usercookie = '';
var postUrl = config.postUrl;
var bookUrl = config.bookUrl;

function getData() {
    getloginCookie(function (data) {
        data.forEach(function (element) {
            usercookie = usercookie + element.match(/\S*=\S*;/);
        });
        console.log(usercookie);
        tools.get('https://www.shanbay.com/wordbook/books/mine/', usercookie, function (err, data) {
            // console.log(data);
        })
    })
}

function getloginCookie(callback) {
    tools.get(postUrl, usercookie, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var $ = cheerio.load(data);
        var csrf = $('#login-form-tmpl').html().match(/value='\w{32}'/)[0].slice(7, -1);
        var auth = {
            username: config.username,
            password: config.password,
            csrfmiddlewaretoken: csrf
        };
        tools.postFrom(postUrl, csrf, auth, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            callback(data);
        })
    });

}
getData();