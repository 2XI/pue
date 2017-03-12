/*
    auth: 2XI
    17/3/11
*/
function Pue(options) {
	this._init(options)
	this.$data.a = 'hsx'
}

Pue.prototype = {
	...require('./instance/init'),
	...require('./instance/compile'),
	...require('./api/lifecycle'),
	...require('./api/data'),
	observer: {...require('./observer/observer.js') } // eslint-disable-line
}

module.exports = Pue