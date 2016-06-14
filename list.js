const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const request = require('request')

let list = {
    request: function(url){
        return new Promise(function(resolve, reject){
            let options = {
                url: url,
                encoding: null
            }
            request(options, function(err, res, body){
                let html = iconv.decode(body, 'gb2312')
                let $ = cheerio.load(html, {decodeEntities: false})
                let lists = []
                $('.mingzhuMain .leftList li a').each(function(idx, elem){
                    lists.push({
                        href: 'http://www.sbkk8.cn' + $(elem).attr('href'),
                        html: $(elem).text()
                    })
                })
                resolve(lists)
            })
        })
    }
} 

module.exports = list