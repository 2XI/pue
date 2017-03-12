import _ from '../util.js'
const newObject = {}

/**
 * 增加给对象“添加属性”的方法
 * defineProperty只能监听已经存在的属性
 * 不能处理data.info = {name:"hsx"}这样的属性定义
 */
_.define(newObject, '$add', function(key, val) {
	if (this.hasOwnProperty(key)) { return }
	_.define(this, key, val, true)
		// let ob = this.$observer
		// ob.observer(key, val)
		// ob.convert(key, val)
})

_.define(newObject, '$delete', function(key) {
	if (!this.hasOwnProperty(key)) { return }
	delete this[key]
})

module.exports = newObject