import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../../../helper/getroute.js';

import { getRandomInt } from '../../../../ServiceFunctions/intRandom.js';
import { performAuthorization } from '../../../../ServiceFunctions/auth.js';
// import { checkDate } from '../checkDate.js';

// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

// Продажа юр. лицу 
test('billSale', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);


  await page.getByRole('link', { name: 'Продажи' }).click();


  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.getByText('Счет на оплату', { exact: true }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

  await page.locator('.multiselect__tags').first().click();
  await page.locator('span').filter({ hasText: 'АО КASPI.KZ' }).first().click();
  await expect(page.getByText('АО КASPI.KZ').first()).toHaveText('АО КASPI.KZ');

  await page.locator('div:nth-child(5) > div > .field > .control > .multiselect > .multiselect__tags').first().click();
  await page.locator('span').filter({ hasText: 'KZ546524521434523452' }).first().click()
  await expect(page.locator('div:nth-child(5) > div > .field > .control > .multiselect > .multiselect__tags').first()).toHaveText('KZ546524521434523452')
  await page.getByPlaceholder('КНП').fill('19')

  await page.locator('#mainContent div').filter({ hasText: 'Товар/Услуга' }).nth(4).click();
  await page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click();
  await expect(page.locator('span').filter({ hasText: 'Булочка с маком' }).first()).toHaveText('Булочка с маком');
  await page.getByPlaceholder('0,000').fill(randomNumber);

  await page.getByRole('button', { name: 'Записать' }).click();

  // Дописать потом
  // await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')

  // // Проверка даты
  // const isDateCorrect = await checkDate(page);
  // await expect(isDateCorrect).toBe(true);
});