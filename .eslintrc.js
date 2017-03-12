module.exports = {
	"extends": "standard",
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		],
		"no-unused-vars": 0,
		"no-console": 0,
		"eol-last": 0,
		"space-before-function-paren": 0,
		"no-proto": 0
	}
};