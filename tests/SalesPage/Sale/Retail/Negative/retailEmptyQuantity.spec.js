import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../../../../helper/getroute.js';
import { performAuthorization } from '../../../../ServiceFunctions/auth.js';

// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

// Общие шаги
async function saleRetail(page) {
  await page.getByRole('link', { name: 'Продажи' }).click();
  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.locator('span').filter({ hasText: 'Продажа (розница)' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

  await page.getByRole('table').locator('div').filter({ hasText: 'Товар / Услуга' }).nth(1).click();
  await page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click();
}

async function getCheck(page) {
  await page.getByRole('button', { name: 'Пробить чек' }).click();
  await expect(page.getByText('Оплата не может быть нулем')).toHaveText('Оплата не может быть нулем');
}

// Продажа розница
test('cashRetailEmptyQuantity', async ({ page }) => {
  await saleRetail(page);
  await getCheck(page);
});

test('cardRetailEmptyQuantity', async ({ page }) => {
  await saleRetail(page);
  await page.getByRole('button', { name: 'Картой' }).click();
  await getCheck(page);
});

test('mixedRetailEmptyQuantity', async ({ page }) => {
  await saleRetail(page);
  await page.getByRole('button', { name: 'Смешанно' }).click();
  await page.getByPlaceholder('0,00').nth(3).fill('2625');
  await page.getByPlaceholder('0,00').nth(4).fill('2625');
  await getCheck(page);
});