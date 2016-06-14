const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const request = require('request')
const fs = require('fs')
let article = {
    request: function(url, path){
        return new Promise(function(resolve, reject){
            let options = {
                url: url,
                encoding: null
            }
            request(options, function(err, res, body){
                let html = iconv.decode(body, 'gb2312')
                let $ = cheerio.load(html, {decodeEntities: false})
                let article = ''
                $('.f_article p').each(function(idx, elem){
                    article += $(elem).html()  + '\n\n'
                })
                let ws = fs.createWriteStream(path, {flag: 'w'})
                ws.write(article)
                resolve(1)
            })
        })
    }
} 

module.exports = article





