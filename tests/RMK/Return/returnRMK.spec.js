import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../helper/getroute.js'

import { performAuthorization } from '../../ServiceFunctions/auth.js';
import { checkDate } from '../../ServiceFunctions/checkDate.js';


// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

// Продажа юр. лицу
test('returnRMK', async ({ page }) => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currentTimeStr = `${hours}:${minutes}`;
  const currentDateStr = currentDate.toLocaleDateString();
  const fullDateTimeStr = `${currentDateStr} ${currentTimeStr}`;


  await page.getByRole('link', { name: 'РМК' }).click();
  await page.getByRole('button', { name: 'Возврат товара' }).click();


  await page.locator('.multiselect__tags').first().click();
  await page.waitForTimeout(1000)
  await page.locator('span').filter({ hasText: /Продажа № \d+/ }).first().click();
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Подтвердить' }).click()
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')

  // Проверка даты
  await expect(page.frameLocator('#document').first().getByText(`Время: ${fullDateTimeStr}`)).toHaveText(`Время: ${fullDateTimeStr}`)

  // закрытие чека
  await page.getByRole('button', { name: 'Закрыть' }).click()
});