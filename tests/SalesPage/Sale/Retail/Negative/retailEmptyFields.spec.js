import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../../../helper/getroute.js';

import { performAuthorization } from '../../../../ServiceFunctions/auth.js';
import { getRandomInt } from '../../../../ServiceFunctions/intRandom.js';


// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

async function saleRetail(page) {
  await page.getByRole('complementary').getByRole('link', { name: 'Продажи' }).click();

  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.locator('span').filter({ hasText: 'Продажа (розница)' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

  await page.getByRole('table').locator('div').filter({ hasText: 'Товар / Услуга' }).nth(1).click();
  await page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click();
}

async function deleteKassa(page) {
  await page.locator('.multiselect__tags').first().click()
  await page.locator('span').filter({ hasText: 'Касса ТИС новая' }).first().click()
  await page.locator('.multiselect__tags').first().click()
  await page.locator('span').filter({ hasText: 'Касса ТИС новая' }).first().click()
}

async function deletStore(page) {
  await page.locator('div:nth-child(2) > .field > .control > .multiselect > .multiselect__tags').click()
  await page.locator('span').filter({ hasText: 'Склад "Про100кулл"' }).first().click()
  await page.locator('div:nth-child(2) > .field > .control > .multiselect > .multiselect__tags').click()
  await page.locator('span').filter({ hasText: 'Склад "Про100кулл"' }).first().click()
}

async function deletUnit(page) {
  await page.getByRole('rowgroup').locator('div').filter({ hasText: 'Штука' }).nth(1).click()
  await page.locator('span').filter({ hasText: 'Штука' }).nth(2).click()
  await page.getByRole('rowgroup').locator('div').filter({ hasText: 'Штука' }).nth(1).click()
  await page.locator('span').filter({ hasText: 'Штука' }).nth(2).click()
}

async function getCheck(page) {
  await page.getByRole('button', { name: 'Пробить чек' }).click();
  await expect(page.getByText('Необходимо заполнить все поля')).toHaveText('Необходимо заполнить все поля')
}

// Продажа розница, наличкой
test('cashRetailEmptyFields', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);


  // Отсутствие "Кассы"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);
  await deleteKassa(page)
  await getCheck(page)

  // Отсутствие "Склада"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);
  await deletStore(page)
  await getCheck(page)

  // Отсутсвие "Товара"
  await page.getByRole('complementary').getByRole('link', { name: 'Продажи' }).click();
  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.locator('span').filter({ hasText: 'Продажа (розница)' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.waitForTimeout(3000)
  await getCheck(page)

  // Отсутствие "Ед. измерения"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);
  await deletUnit(page)
  await getCheck(page)
});

// Продажа розница, картой
test('cardRetailEmptyFields', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);


  // Отсутствие "Кассы"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);
  await deleteKassa(page)
  await getCheck(page)

  // Отсутствие "Склада"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);
  await deletStore(page)
  await getCheck(page)

  // Отсутсвие "Товара"
  await page.getByRole('complementary').getByRole('link', { name: 'Продажи' }).click();
  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.locator('span').filter({ hasText: 'Продажа (розница)' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.waitForTimeout(3000)
  await getCheck(page)

  // Отсутствие "Ед. измерения"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill(randomNumber);
  await deletUnit(page)
  await getCheck(page)
})

// Продажа розница, наличкой и картой
test('mixedRetailEmptyFields', async ({ page }) => {
  // Отсутствие "Кассы"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill('5');
  await deleteKassa(page)
  await getCheck(page)

  // Отсутствие "Склада"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill('5');
  await deletStore(page)
  await getCheck(page)

  // Отсутсвие "Товара"
  await page.getByRole('complementary').getByRole('link', { name: 'Продажи' }).click();
  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.locator('span').filter({ hasText: 'Продажа (розница)' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.waitForTimeout(3000)
  await getCheck(page)

  // Отсутствие "Ед. измерения"
  await saleRetail(page)
  await page.getByPlaceholder('0,000').fill('5');
  await deletUnit(page)
  await getCheck(page)
})