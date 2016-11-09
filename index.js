var db = require("./db");
var tools = require("./tools");
var config = require("./config");
var cheerio = require("cheerio");
var fs = require('fs');

var postUrl = config.postUrl;
var mineBookUrl = config.mineBookUrl;

function getloginCookie() {
    tools.get(postUrl, function (err, data) {
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
        tools.postFrom(postUrl, auth, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            tools.get(mineBookUrl, function (err, data) {
                var $ = cheerio.load(data);
                var bookListUrl = $('.wordbook-title').find('a')[0].attribs.href;
                getData('https://www.shanbay.com' + bookListUrl);
            })
        })
    });

}
getloginCookie();
function getData(bookUrl) {
    tools.get(bookUrl, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var wordBookList = [];
        var wordBookPage = [];
        var $ = cheerio.load(data);
        var aList = $('.wordbook-wordlist-name').find('a');
        aList.each(function (i, elem) {
            wordBookList.push(aList[i].attribs.href);
        });
        wordBookList.shift();
        wordBookList.forEach(function (element, index, array) {
            for (var i = 1; i < 11; i++) {
                wordBookPage.push('https://www.shanbay.com' + element + '?page=' + i);
            }
        });
        var wordBookPageLength = wordBookPage.length;
        for (var j = 0; j < 10; j++) {
            tools.get(wordBookPage[j], function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                var $2 = cheerio.load(data, { decodeEntities: false });
                var worldList = '';
                var words = $2('.span2').children();
                var mean = $2('.span10');
                var listLength = $2('.span2').children().length;
                for (var z = 0; z < listLength; z++) {
                    worldList = words[z].children[0].data + ':' + mean[z].children[0].data
                    fs.writeFile('word.txt', worldList, 'utf8', (err) => {
                        if (err) throw err;
                        console.log('Success !');
                    });
                }
            });
            interval(3500);
        }

    })
}

function interval(n) {
    var start = new Date().getTime();
    while (true) {
        var time = new Date().getTime();
        if (time - start > n) {
            break;
        }
    }
};