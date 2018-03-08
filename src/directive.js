function Directive(name, el, vm, expression) {
	this.name = name
	this.el = el
	this.vm = vm
	this.expression = expression
	this.attr = 'nodeValue'

	this.update()
}

Directive.prototype.update = function() {
	let token = this.expression.split('.')
	let data = this.vm.$data
	token.forEach(element => {
		data = data[element]
	})
	this.el[this.attr] = data
	console.log(`更新了DOM-${this.expression}`)
}

module.exports = Directive