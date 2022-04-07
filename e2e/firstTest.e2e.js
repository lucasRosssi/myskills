describe('Meus primeiros testes', () => {
	beforeAll(async () => {
		await device.launchApp();
	});

	it('should have welcome screen', async () => {
		await expect(element(by.id('welcome'))).toBeVisible();
	});

	it('should register new skill', async () => {
		const inputNewSkill = await element(by.id('input-new'));
		const buttonAdd = await element(by.id('button-add'));
		const skillCard = await element(by.id('skill-card'));

		await inputNewSkill.tap();
		await inputNewSkill.typeText('React Native');
		await buttonAdd.tap();

		await expect(skillCard).toBeVisible();
	});

	it('should delete skill card', async () => {
		const skillCard = await element(by.id('skill-card'));

		await skillCard.longPress();

		expect(skillCard).not.toBeVisible();
	});
});
