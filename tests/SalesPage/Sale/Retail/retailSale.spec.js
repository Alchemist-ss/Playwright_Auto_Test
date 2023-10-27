import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../../helper/getroute.js';

import { getRandomInt } from '../../../ServiceFunctions/intRandom.js';
import { performAuthorization } from '../../../ServiceFunctions/auth.js';
import { checkDate } from '../../../ServiceFunctions/checkDate.js';


// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

async function saleRetail(page) {
  await page.getByRole('link', { name: 'Продажи' }).click();

  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.locator('span').filter({ hasText: 'Продажа (розница)' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

  await expect(page.locator('.multiselect__tags').filter({ hasText: 'Касса ТИС новая' }).first()).toHaveText('Касса ТИС новая');
  await page.waitForTimeout(1000)
  await expect(page.locator('div:nth-child(2) > .field > .control > .multiselect > .multiselect__tags')).toHaveText('Склад "Про100кулл"')
  await page.getByRole('table').locator('div').filter({ hasText: 'Товар / Услуга' }).nth(1).click();
  await page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click();
  await expect(page.locator('span').filter({ hasText: 'Булочка с маком' }).first()).toHaveText('Булочка с маком');
}

async function getCheck(page) {
  await page.getByRole('button', { name: 'Пробить чек' }).click();
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')
}

// Продажа юр. лицу
test('cashRetailSale', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);

  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);

  await getCheck(page)

  // Проверка даты
  const isDateCorrect = await checkDate(page);
  await expect(isDateCorrect).toBe(true);
});

test('cardRetailSale', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);

  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);


  await page.getByRole('button', { name: 'Картой' }).click()
  await getCheck(page)

  // Проверка даты
  const isDateCorrect = await checkDate(page);
  await expect(isDateCorrect).toBe(true);
})

test('mixedRetailSale', async ({ page }) => {
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill('5');

  await page.getByRole('button', { name: 'Смешанно' }).click()
  await page.getByPlaceholder('0,00').nth(3).fill('1125')
  await page.getByPlaceholder('0,00').nth(4).fill('1125')
  await getCheck(page)

  // Проверка даты
  const isDateCorrect = await checkDate(page);
  await expect(isDateCorrect).toBe(true);
})