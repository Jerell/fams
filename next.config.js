const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

const withTM = require('next-transpile-modules')([
	'd3-force',
	'd3-selection',
	'd3-quadtree',
	'd3-dispatch',
	'd3-timer',
]) // pass the modules you would like to see transpiled

module.exports = withTM(
	withPWA({
		pwa: {
			dest: 'public',
		},
	})
)
