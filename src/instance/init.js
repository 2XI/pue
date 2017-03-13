exports._init = function(options) {
	this.$options = options
	this.$data = options.data
	this.$el = document.querySelector(options.el)

	// 保存模板以备下次编译
	this.$template = this.$el.cloneNode(true)

	// 创建观察对象
	this.observer = this.observer.create(this.$data)

	// 触发set事件之后会重新编译
	this.observer.on('set', this.$mount.bind(this))

	// 渲染挂载
	this.$mount()
}