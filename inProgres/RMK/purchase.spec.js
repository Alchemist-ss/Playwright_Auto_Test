import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';
import { performAuthorization } from '../ServiceFunctions/auth.js';

// Открытие страницы
test.beforeEach(async ({ page }) => {
  // Переход на страницу TIS-Stage
  await page.goto(getStageUrl());
  // Перейти в полноэкранный режим
  await page.setViewportSize({ width: 1920, height: 1080 })
});

// Продажа РМК (наличка)
test('PurchaseCash', async ({ page }) => {
  await performAuthorization(page);
  // Проверить, что URL изменился
  await expect(page).toHaveURL('https://stage.uchet24.kz');
  await page.getByRole('link', { name: 'РМК' }).click();
  await expect(page).toHaveURL('https://stage.uchet24.kz/rmk');
  await page.getByRole('button', { name: 'Без категории' }).click();
  await page.getByRole('button', { name: '+' }).nth(1).click();
  await page.getByRole('button', { name: 'Оплата' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  // Дописать когда пофиксят
  await page.waitForTimeout(2000)
});