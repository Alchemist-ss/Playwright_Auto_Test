import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../../../helper/getroute.js';

import { getRandomInt } from '../../../../ServiceFunctions/intRandom.js';
import { performAuthorization } from '../../../../ServiceFunctions/auth.js';
import { checkDate } from '../../../../ServiceFunctions/checkDate.js'

// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

// Продажа юр. лицу
test('legalSale', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);


  await page.getByRole('link', { name: 'Продажи' }).click();


  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.getByText('Продажа (юр. лицу)', { exact: true }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

  await page.locator('.multiselect__tags').first().click();
  await page.locator('span').filter({ hasText: 'АО КASPI.KZ' }).first().click();
  await expect(page.getByText('АО КASPI.KZ').first()).toHaveText('АО КASPI.KZ');
  await page.getByRole('table').locator('div').filter({ hasText: 'Товар / Услуга' }).nth(1).click();
  await page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click();
  await expect(page.locator('span').filter({ hasText: 'Булочка с маком' }).first()).toHaveText('Булочка с маком');
  await page.getByPlaceholder('0,000').fill(randomNumber);

  await page.getByRole('button', { name: 'Записать' }).click();
  await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')

  // Проверка даты
  const isDateCorrect = await checkDate(page);
  await expect(isDateCorrect).toBe(true);
});