import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';


// Открытие страницы
test.beforeEach(async ({ page }) => {
  // Переход на страницу TIS-Stage
  await page.goto(getStageUrl());
  // Перейти в полноэкранный режим
  await page.setViewportSize({ width: 1920, height: 1080 })
});

// Функция для авторизации
async function performAuthorization(page) {
  // Найти и вписать значение
  await page.getByPlaceholder('Введите email').fill('t.alchemist@mail.ru')

  // Найти и вписать значение
  await page.getByPlaceholder('Введите пароль').fill('Иыsv856@$#')

  // Нажатие на кнопку
  await page.getByRole('button', { name: 'Войти' }).click()
}

// Генерация случайного целого числа в диапазоне от min до max (включительно)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Продажа РМК (наличка)
test('PurchaseCash', async ({ page }) => {
  const randomNumber = getRandomInt(1, 10);
  await performAuthorization(page);
  // Проверить, что URL изменился
  await expect(page).toHaveURL('https://stage.uchet24.kz');
  await page.getByRole('link', { name: 'Продажи' }).click();
  await expect(page).toHaveURL('https://stage.uchet24.kz/sales');
  await page.getByRole('button', { name: 'Новая операция' }).click();
  await page.getByText('Продажа (юр. лицу)', { exact: true }).click();
  await page.getByRole('button', { name: 'Подтвердить' }).click();
  await page.locator('.multiselect__tags').first().click();
  await page.locator('span').filter({ hasText: 'АО КASPI.KZ' }).first().click();
  await expect(page.getByText('АО КASPI.KZ').first()).toHaveText('АО КASPI.KZ');
  await page.getByRole('table').locator('div').filter({ hasText: 'Товар / Услуга' }).nth(1).click();
  await page.locator('span').filter({ hasText: 'Булочка с маком' }).first().click();
  await expect(page.locator('span').filter({ hasText: 'Булочка с маком' }).first()).toHaveText('Булочка с маком');
  await page.getByPlaceholder('0,000').fill(randomNumber.toString());
  await page.getByRole('button', { name: 'Записать' }).click();
  await expect(page.getByText('Операция успешно создана!')).toHaveText('Операция успешно создана!')
  await page.waitForTimeout(2000)
});