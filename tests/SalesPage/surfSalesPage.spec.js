import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';
import { performAuthorization } from '../ServiceFunctions/auth.js';

// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

async function goToSalesPage(page) {
  await page.getByRole('complementary').getByRole('link', { name: 'Продажи' }).click();
  await expect(page).toHaveURL('https://stage.uchet24.kz/sales');
  await page.getByRole('button', { name: 'Новая операция' }).click();
}

async function performSalesAction(page, label, expectedURL) {
  await goToSalesPage(page);
  await page.locator('label').filter({ hasText: label }).locator('span').first().click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await expect(page).toHaveURL(expectedURL);
}

test('surfSalesPage', async ({ page }) => {
  await expect(page).toHaveURL('https://stage.uchet24.kz');

  // Продажа (юр. лицу)
  await performSalesAction(page, 'Продажа (юр. лицу)', 'https://stage.uchet24.kz/sales/new');

  // Продажа (розница)
  await performSalesAction(page, 'Продажа (розница)', 'https://stage.uchet24.kz/sales/retail-new');

  // Счет на оплату
  await performSalesAction(page, 'Счет на оплату', 'https://stage.uchet24.kz/sales/bill');

  // Возврат (юр. лицу)
  await performSalesAction(page, 'Возврат', 'https://stage.uchet24.kz/sales/return');

  // Возврат продажи (розница)
  await performSalesAction(page, 'Возврат продажи (розница)', 'https://stage.uchet24.kz/sales/retail-return');
});