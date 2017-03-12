/**
 * 观察对象
 */

import newArray from './array.js'
import newObject from './object.js'

const ARRAY = 0
const OBJECT = 1

/**
 * 观察者构造函数
 * @param value {Object} 数据对象
 * @param type {Int} 数据对象的类型(分为对象和数组)
 * @constructor
 */

function Observer(value, type) {
	this.value = value

	// 这里的enumerable一定要设为false,否则会触发死循环
	// 将当前对象存储到其$observer属性中
	Object.defineProperty(value, '$observer', {
		value: this,
		enumerable: false,
		writable: true,
		configurable: true
	})

	if (type === ARRAY) {
		value.__proto__ = newArray
		this.link(value)
	}
	if (type === OBJECT) {
		value.__proto__ = newObject
		this.walk(value)
	}
}

/**
 * 遍历数据对象
 * @param obj {Object} 待遍历的数据对象
 */

Observer.prototype.walk = function(obj) {
	let val
	for (var key in obj) {
		if (!obj.hasOwnProperty(key)) { return }
		val = obj[key]
		this.convert(key, val)
	}
}

/**
 * 定义对象属性
 * @param key {String} 属性名
 * @param val {Any} 属性值
 */

Observer.prototype.convert = function(key, val) {
	let ob = this
	Object.defineProperty(this.value, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			return val
		},
		set: function(newValue) {
			if (newValue === val) { return }
			val = newValue
			console.log('你设置了' + key + '，新的' + key + '=' + newValue)
			ob.notify('set', key, newValue)
			ob.notify(`set:${key}`, key, newValue)
		}
	})
}

/**
 * 调用observer函数
 * 判断是否有父节点，如果有则存储父节点到自身
 * @param key {String} 键值
 * @param val {Any} 属性值
 */

Observer.prototype.observe = function(key, val) {
	let ob = Observer.create(val)
	if (!ob) { return }
	ob.parent = {
		key,
		ob: this
	}
}

/**
 * 处理: var ary = [1,{name:liangshaofeng}]的情况
 * @param items {Array} 待处理数组
 */

Observer.prototype.link = function(items) {
	items.forEach((value, index) => {
		this.observe(index, value)
	})
}

/**
 * 订阅事件
 * @param event {String} 事件类型
 * @param fn {Function} 对调函数
 * @returns {Observer} 观察者对象
 */

Observer.prototype.on = function(event, fn) {
	this._cbs = this._cbs || {}
	if (!this._cbs[event]) {
		this._cbs[event] = []
	}
	this._cbs[event].push(fn)
		// 实现连级调用
	return this
}

/**
 * 取消订阅事件
 * @param event {String} 事件名称
 * @param fn {Function} 回调函数
 * @returns {Observer} 观察者对象
 */

Observer.prototype.off = function(event, fn) {
	this._cbs = this._cbs || {}

	// 取消所有事件
	if (!arguments.length) {
		this._cbs = {}
		return this
	}

	let callbacks = this._cbs[event]
	if (!callbacks) {
		return this
	}

	// 取消特定事件
	if (arguments.length === 1) {
		delete this._cbs[event]
		return this
	}

	// 取消特定事件的回调函数
	for (let i = 0, cb; i < callbacks.length; i++) {
		cb = callbacks[i]
		if (cb === fn) {
			callbacks.splice(i, 1)
			break
		}
	}
	return this
}

/**
 * 触发消息，将消息往上层传递
 * @param event {String} 事件类型
 * @param path {Path} 事件触发路径
 * @param val {Any} 触发事件时传入的值
 */

Observer.prototype.notify = function(event, path, val) {
	this.emit(event, path, val)
	let parent = this.parent
	if (!parent) { return }
	let ob = parent.ob
	ob.notify(event, path, val)
}

/**
 * 触发执行回调函数
 * @param event {String} 事件类型
 * @param path {Path} 事件触发路径
 * @param val {Any} 触发事件时传入的值
 */

Observer.prototype.emit = function(event, path, val) {
	this._cbs = this._cbs || {}
	let callbacks = this._cbs[event]
	if (!callbacks) { return }
	callbacks.forEach((cb, i) => {
		cb.apply(this, val)
	})
}

/**
 * 根据不同的数据类型调用ObserverO构造函数
 * @param value {Any} 数据
 * @returns {Observer}
 */

Observer.create = function(value) {
	if (Array.isArray(value)) {
		return new Observer(value, ARRAY)
	} else {
		return new Observer(value, OBJECT)
	}
}

module.exports = Observer