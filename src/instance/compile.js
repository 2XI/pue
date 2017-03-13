let fragment
let currentNodeList = []

exports._compile = function() {
	fragment = document.createDocumentFragment()

	// 用一个栈存储遍历过程中当前的父节点
	currentNodeList.push(fragment)

	this._compileNode(this.$template)

	this.$el.parentNode.replaceChild(fragment, this.$el)
		// 这里为什么要执行下面的语句

	// 获得编译之后的挂载元素节点
	this.$el = document.querySelector(this.$options.el)
}

exports._compileElement = function(node) {
	let newNode = document.createElement(node.tagName)
	if (node.hasAttributes()) {
		let attrs = node.attributes
		Array.from(attrs).forEach((attr) => {
			newNode.setAttribute(attr.name, attr.value)
		})
	}

	let currentNode = currentNodeList[currentNodeList.length - 1].appendChild(newNode)
	if (node.hasChildNodes()) {
		currentNodeList.push(currentNode)
		Array.from(node.childNodes).forEach(this._compileNode, this)
	}

	currentNodeList.pop()
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
	currentNodeList[currentNodeList.length - 1].appendChild(document.createTextNode(nodeValue))
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