module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/$1',
		'\\.(scss|sass|css)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	testPathIgnorePatterns: [
		'<rootDir>/.next/',
		'<rootDir>/node_modules/',
		'.d.ts',
		'.js',
	],
	transformIgnorePatterns: ['node_modules[/\\\\](?!@amcharts[/\\\\]amcharts4)'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	// https://github.com/zeit/next.js/issues/8663#issue-490553899
	globals: {
		// we must specify a custom tsconfig for tests because we need the typescript transform
		// to transform jsx into js rather than leaving it jsx such as the next build requires. you
		// can see this setting in tsconfig.jest.json -> "jsx": "react"
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.jest.json',
		},
	},
}
