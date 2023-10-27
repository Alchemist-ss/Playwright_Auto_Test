import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../helper/getroute.js'

import { performAuthorization } from '../../ServiceFunctions/auth.js';
// import { checkDate } from '../../ServiceFunctions/checkDate.js';

// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

async function getProduct(page) {
  await page.getByRole('link', { name: 'РМК' }).click();

  await page.getByRole('button', { name: 'Без категории' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: 'Оплата' }).click();
}

async function wrokChek(page) {
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Закрыть' }).click();
}

// Продажа юр. лицу
test('cashSaleRMK', async ({ page }) => {
  await getProduct(page)

  await wrokChek(page)


  // Дописать когда пофиксят TISD-279
  // // Проверка даты
  // await page.locator('div').filter({ hasText: '.logotis_svg__cls-7{fill:#fff}' }).nth(4).click();
  // await page.getByRole('link', { name: 'Продажи' }).click();
  // const isDateCorrect = await checkDate(page);
  // await expect(isDateCorrect).toBe(true);
});

test('cardSaleRMK', async ({ page }) => {
  await getProduct(page)

  await page.locator('.d-flex > .multiselect > .multiselect__select').click()
  await page.locator('span').filter({ hasText: 'Банковской картой' }).first().click()

  await wrokChek(page)
})

test('mixedSaleRMK', async ({ page }) => {
  await getProduct(page)

  await page.locator('.d-flex > .multiselect > .multiselect__select').click()
  await page.locator('span').filter({ hasText: 'Смешанно' }).first().click()

  await page.locator('input#cash_payment_amount').clear(); // Очистить поле ввода
  await page.waitForTimeout(500); // Подождать 500 миллисекунд (или измените значение по необходимости)
  await page.locator('input#cash_payment_amount').fill('1000'); // Заполнить новым значением
  await page.waitForTimeout(500)
  await page.locator('#bank_payment_amount').fill('50')

  await wrokChek(page)
})