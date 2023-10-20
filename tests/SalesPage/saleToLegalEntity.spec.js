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


  await page.getByRole('link', { name: 'Продажи' }).click();


  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.getByText('Продажа (юр. лицу)', { exact: true }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();

  await page.locator('.multiselect__tags').first().click();
  await page.locator('span').filter({ hasText: 'АО КASPI.KZ' }).first().click();
  await expect(page.getByText('АО КASPI.KZ').first()).toHaveText('АО КASPI.KZ');
  await page.getByRole('table').locator('div').filter({ hasText: 'Товар / Услуга' }).nth(1).click();
  await page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click();
  await expect(page.locator('span').filter({ hasText: 'Булочка с маком' }).first()).toHaveText('Булочка с маком');
  await page.getByPlaceholder('0,000').fill(randomNumber);

  await page.getByRole('button', { name: 'Записать' }).click();
  await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')

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