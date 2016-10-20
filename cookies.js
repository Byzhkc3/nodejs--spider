var tools = require('./tools');
var cheerio = require('cheerio');

var usercookie = null;

exports.getCookie = function (callback) {
    if (!usercookie) console.log('Get cookie');
    tools.get(url, usercookie, function (err, data) {
        if (err) {
            console.log('Get cookie error');
            return;
        }
        var $ = cheerio(data, { decodeEntities: false });
    });
}