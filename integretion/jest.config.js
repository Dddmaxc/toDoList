module.exports = {
	presets: 'jest-puppeteer',
	testRegex: './\\.test\\.js$',
	setupFilesAfterEvn: ['./setupTest.js'],
}
