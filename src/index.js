/*
    auth: 2XI
    17/3/11
*/
function Pue(options) {
	this._init(options)
}

Pue.prototype = {
	constructor: Pue,
	...require('./instance/init'),
	...require('./instance/compile'),
	...require('./api/lifecycle'),
	...require('./api/data'),
	...require('./instance/bindings'),
	observer: {...require('./observer/observer') } // eslint-disable-line
}

module.exports = Pue