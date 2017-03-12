var Pue = require('../src/index')
const app = new Pue({
	el: '#app',
	data: {
		user: {
			name: 'youngwind',
			age: 24
		},
		a: 'wz'
	}
	// ,
	// watch: {
	// 	a: function() {
	// 		console.log('Hello world!')
	// 	}
	// }
})