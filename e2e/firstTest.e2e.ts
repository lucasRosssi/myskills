import { expect } from 'detox';

describe('Meus primeiros testes', () => {
	beforeAll(async () => {
		await device.launchApp();
	});

	beforeEach(async () => {
		await device.reloadReactNative();
	});

	it('should have welcome screen', async () => {
		await expect(element(by.id('welcome'))).toBeVisible();
	});

	it('should register new skill', async () => {
		const inputNewSkill = element(by.id('input-new'));
		const buttonAdd = element(by.id('button-add'));
		const skillCard = element(by.id('skill-card'));

		await inputNewSkill.tap();
		await inputNewSkill.typeText('React Native');
		await buttonAdd.tap();

		await expect(skillCard).toBeVisible();
	});

	it('should delete skill card', async () => {
		const skillCard = element(by.id('skill-card'));

		await skillCard.longPress();

		await expect(skillCard).not.toExist();
	});
});
