/*
 * 17/3/12
 *改写数组的push等方法
 */

const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const newArray = []
methods.forEach((method) => {
	// 直接在数组对象上定义新的方法，短路掉原生的数组方法
	newArray[method] = function() {
		let origin = Array.prototype[method]
		console.log('这是新的数组方法哦！')
		return origin.apply(this, arguments)
	}
})

module.exports = newArray