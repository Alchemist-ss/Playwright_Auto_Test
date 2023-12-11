import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../../../helper/getroute.js';

import { performAuthorization } from '../../../../ServiceFunctions/auth.js';
import { checkDate } from '../../../../ServiceFunctions/checkDate.js';


// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

// Продажа юр. лицу
test('retailReturn', async ({ page }) => {
  await page.getByRole('link', { name: 'Продажи' }).click();


  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.getByText('Возврат продажи (розница)', { exact: true }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

  await page.locator('div:nth-child(3) > .field > .control > .multiselect > .multiselect__tags').click()
  await page.waitForTimeout(1000)
  await page.locator('span').filter({ hasText: /Продажа № \d+/ }).first().click();


  await expect(page.getByText('Касса ТИС новая').first()).toHaveText('Касса ТИС новая')
  await expect(page.getByText('Склад "Про100кулл"').first()).toHaveText('Склад "Про100кулл"')
  await expect(page.getByRole('rowgroup').locator('div').filter({ hasText: 'Булочка с маком' }).nth(1)).toHaveText('Булочка с маком')

  await page.getByRole('button', { name: 'Пробить чек' }).click();
  await page.waitForSelector('text=Операция успешно создана!')
  await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')
  await page.getByRole('button', { name: 'Закрыть' }).click();

  // Проверка даты
  const isDateCorrect = await checkDate(page);
  await expect(isDateCorrect).toBe(true);
});