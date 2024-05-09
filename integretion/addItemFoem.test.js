describe('addItemForm', () => {
	it('base example, visually looks correct', async () => {
		await page.goto()
		const image = await page.screenshot()

		expect(image).toMatchImageSnapshot()
	})
})
