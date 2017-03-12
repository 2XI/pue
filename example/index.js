var Pue = require('../src/index')
const app = new Pue({
	el: '#app',
	data: {
		user: {
			name: 'youngwind',
			age: 24
		}
	}
})

function test() {
	console.log('Hello world!')
}

test()