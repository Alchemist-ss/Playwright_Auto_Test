import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';
import { performAuthorization } from '../ServiceFunctions/auth.js';
import { getRandomInt } from '../ServiceFunctions/intRandom.js';

// Открытие страницы и авторизация
test.beforeEach(async ({ page }) => {
  await page.goto(getStageUrl());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await performAuthorization(page);
});

// Продажа юр. лицу
test('SaleToLegalEntity', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);

  await expect(page).toHaveURL('https://stage.uchet24.kz');

  await page.locator('text=Продажи').click();
  await expect(page).toHaveURL('https://stage.uchet24.kz/sales');

  await page.locator('text=Новая операция').click();
  await page.locator('text=Продажа (юр. лицу)').click();
  await page.locator('text=Подтвердить').click();

  await Promise.all([
    page.locator('.multiselect__tags').first().click(),
    page.locator('span').filter({ hasText: 'АО КASPI.KZ' }).first().click(),
    page.locator('text=АО KASPI.KZ').first().waitForElementState('visible'),
    page.locator('div:has-text("Товар / Услуга")').nth(1).click(),
    page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click(),
    page.locator('text=Булочка с маком').first().waitForElementState('visible'),
  ]);

  await page.locator('input[placeholder="0,000"]').fill(randomNumber);

  await page.locator('text=Записать').click();
  await expect(page.locator('text=Операция успешно создана!')).toBeVisible();

  // Взять текущую дату
  const currentDate = new Date();
  // Преобразовать текущую дату в строку в том же формате, который ожидается на странице
  const currentDateStr = currentDate.toLocaleDateString();
  // Ваш код для выбора элемента с датой
  const dateElement = await page.locator('text=' + currentDateStr).first();
  // Получить текст из элемента
  const dateOnPage = await dateElement.textContent();
  // Проверить, что дата на странице содержит текущую дату
  await expect(dateOnPage).toContain(currentDateStr);
});
