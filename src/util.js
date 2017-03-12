/*
 * 定义对象属性
 */

/**
 * @param obj {Object} 对象
 * @param key {String} 键值
 * @param val {*} 值
 * @param enumerable {Boolean} 布尔值
 */

exports.define = function(obj, key, val, enumerable) {
	Object.defineProperty(obj, key, {
		value: val,
		enumerable: !!enumerable,
		writable: true,
		configurable: true
	})
}