let article = require('./article.js')
let list = require('./list.js')
let argument = process.argv.splice(2)
let url = argument[0]

list.request(url).then(function(value){
	// let arr = [value[0], value[1]]
	let promises = value.forEach(function(item, index){
		article.request(item.href, 'temp/' + index + ' ' + item.html)
	})
	Promise.all(promises).then(function(){
		console.log('haha gaoding')
	})
})