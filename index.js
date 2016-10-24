var db = require("./db");
var tools = require("./tools");
var config = require('./config');
var superagent = require("superagent");
var cheerio = require('cheerio');

var usercookie = null;

function main() {
    cookies.getCookie
}

function getloginCookie() {
    superagent.post()
}

function getCsrf(callback) {
    tools.get(config.url, usercookie.cookie, function (err, data) {
        if (err) {
            console.log('Get cookie error');
            return;
        }
        var $ = cheerio(data, { decodeEntities: false });
        var csrf = $("input[name='csrfmiddlewaretoken']").val();
        if (!csrf) {
            console.log('csrfmiddlewaretoken not found');
            return;
        }
        return csrf;
    });
}