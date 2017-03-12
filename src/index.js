/*
    auth: 2XI
    17/3/11
*/

function Pue(options) {
	this._init(options)
}

Pue.prototype = {
	...require('./instance/init'),
	...require('./instance/compile'),
	...require('./api/lifecycle')
}

module.exports = Pue