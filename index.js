var request = require("request");
var cheerio = require("cheerio");

request('https://www.shanbay.com/wordbook/23/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        console.log($('.wordbook-wordlist-name').text());
    }
});