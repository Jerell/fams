module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					esmodules: true,
				},
			},
		],
		'next/babel',
		// '@babel/preset-react',
		// '@babel/preset-typescript',
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import',
	],
}
