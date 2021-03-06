/**
 * hsx 17/3/12
 */

exports.$watch = function(key, fn) {
	let _fn = function() {
		// arguments数组中包含：事件类型、事件触发路径、事件回调函数的参数
		fn(arguments[2])
	}

	let pathAry = key.split('.')
	if (pathAry.length === 1) {
		this.$data.$observer.on(`set:${key}`, _fn.bind(this))
	} else {
		let _temp = this.$data
		let lastProperty = pathAry.pop()

		pathAry.forEach((property) => {
			_temp = _temp[property]
		})
		_temp.$observer.on(`set:${lastProperty}`, _fn.bind(this)) // eslint-disable-line
	}
}