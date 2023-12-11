import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../../helper/getroute.js'

import { performAuthorization } from '../../../ServiceFunctions/auth.js';


// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

// Продажа юр. лицу
test('returnRMK', async ({ page }) => {
  await page.getByRole('link', { name: 'РМК' }).click();
  await page.getByRole('button', { name: 'Возврат товара' }).click();

  await page.locator('.multiselect__tags').first().click();
  await page.waitForTimeout(1000)
  await page.locator('span').filter({ hasText: /Продажа № \d+/ }).first().click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.waitForSelector(`text=Операция успешно создана!`);
  await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')

  // закрытие чека
  await page.getByRole('button', { name: 'Закрыть' }).click()
});