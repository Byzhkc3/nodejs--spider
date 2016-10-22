var tools = require('./tools');
var cheerio = require('cheerio');
var db = require('./db');
var config = require('./config');

var usercookie = null;

exports.getCookie = function (callback) {
    db.getUser(config.username, function (result) {
        if (!result || !result.name) {
            console.log('name not found');
        } else {
            usercookie = result;
        }
    });

    tools.get(config.url, usercookie.cookie, function (err, data) {
        if (err) {
            console.log('Get cookie error');
            return;
        }
        var $ = cheerio(data, { decodeEntities: false });
        var csrf = $("input[name='csrfmiddlewaretoken']").val();
    });
}