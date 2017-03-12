exports._compile = function() {
	this._compileNode(this.$el)
}

exports._compileElement = function(node) {
	if (node.hasChildNodes) {
		Array.from(node.childNodes).forEach(this._compileNode, this)
	}
}

exports._compileText = function(node) {
	let nodeValue = node.nodeValue
	if (nodeValue === '') { return }
	let patt = /{{\S+}}/g
	let ret = nodeValue.match(patt)
	if (!ret) return
	ret.forEach((value) => {
		let property = value.replace(/[{}]/g, '')
		let attr = property.split('.')
		let pro = this.$data
		attr.forEach((val) => {
			pro = pro[val]
		})
		nodeValue = nodeValue.replace(value, pro)
	}, this)
	node.nodeValue = nodeValue
}

exports._compileNode = function(node) {
	switch (node.nodeType) {
		case 1:
			this._compileElement(node)
			break
		case 3:
			this._compileText(node)
			break
		default:
			return
	}
}