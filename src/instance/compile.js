import Directive from '../directive'

let fragment
let currentNodeList = []

exports._compile = function() {
	this._compileNode(this.$el)
}

exports._compileElement = function(node) {
	if (node.hasChildNodes()) {
		Array.from(node.childNodes).forEach(this._compileNode, this)
	}
}

exports._compileText = function(node) {
	let patt = /{{\w+}}/g
	let nodeValue = node.nodeValue
	let expressions = nodeValue.match(patt)

	if (!expressions) return

	expressions.forEach((expression) => {
		let el = document.createTextNode('')
		node.parentNode.insertBefore(el, node)
		let property = expression.replace(/[{}]/g, '')
		this._bindDirective('text', property, el)
	})
	node.parentNode.removeChild(node)
}

exports._compileNode = function(node) {
	switch (node.nodeType) {
		// node
		case 1:
			this._compileElement(node)
			break
			// text
		case 3:
			this._compileText(node)
			break
		default:
			return
	}
}

exports._bindDirective = function(name, expression, node) {
	let dirs = this._directives
	dirs.push(
		new Directive(name, node, this, expression)
	)
}