import { test, expect } from '@playwright/test';
import { getStageUrl } from '../../helper/getroute.js';

// Открытие страницы TIS-Stage перед каждым тестом
test.beforeEach(async ({ page }) => {
  // Переход на страницу TIS-Stage
  await page.goto(getStageUrl());

  // Перейти в полноэкранный режим
  await page.setViewportSize({ width: 1920, height: 1080 });
});

// Тест на регистрацию (позитивный сценарий)
test('Positive Registration', async ({ page }) => {

  // Нажать на ссылку "Зарегистрироваться"
  await page.getByRole('link', { name: 'Зарегистрироваться' }).click();

  // Проверить, что URL изменился
  await expect(page).toHaveURL('https://stage.uchet24.kz/auth/register');

  // Заполнить поля регистрации, включая поле email
  await page.getByPlaceholder('Ваше имя').fill('Авто');
  await page.getByPlaceholder('Ваша фамилия').fill('Тестирование');
});
